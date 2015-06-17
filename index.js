$(document).ready(function () {
    var forms = {
        textItem: '',
        selectItem: '',
        valueArray: [],
        radioValue: '',
        textareaValue: '',
        calculate: false,
        checkboxValue: '',
        
        //if calculate is true, then the values need to be returned when calling object methods.
        //if the calculte is false, then the values need to just be sent to the array.
        
        //inject the id of first for every select option
        htmlInject: function () {
            $('select option').eq(0).attr('id', 'first');
        },
        onSubmit: function(identity, itemProp, varInject, id)
        {
            var item = itemProp; 
            $(identity).click(function(){
                varInject = item.val(); 
                forms.submitVal(varInject, id); 
                $('#itemValue').append(varInject);
            });     
        },
        getVal: function (id, type) {
            //add the values back to the array using the cookies
            var cookies = document.cookie.split(';'); 
            $.each(cookies, function(index, value){
                var subname = value.split('=');
                //[0] = type
                //[1] = value
                $('body').find([name="'"+subname[0]+"'"]).val(subname[1]);
                console.log(subname[0]);
                
            });
            
            //get value of text input on off change
            if (type == 'text') {                              
               forms.onSubmit('button#submit', $('input').attr('name', id), this.textItem, id );                
            }
            //get value of text input on item change
            if (type == 'select') {
                forms.onSubmit('button#submit', $('select').attr('name', id), this.selectItem, id ); 
            }
            if ( type == 'radio') 
            {
                $('button#submit').click(function(){
                    this.radioValue = $("input[type='radio']").filter(':checked').val();
                    $('#itemValue').append(this.radioValue);
                });
            }
            if ( type == 'textarea')
            {
                 forms.onSubmit('button#submit', $('textarea').attr('name', id), this.textareaValue, id);   
            }
            if ( type == 'checkbox')
            {
                 forms.onSubmit('button#submit', $('input').attr('name', id), this.checkboxValue, id );   
            }                        
        },
        //take the value from the dropdown on change
        //and add the value to the selected div
        submitVal: function (item, id) {
            /* build an array that will house the name
            and the value of the element. 
            remove any value in the div and replace
            with the new value */
            var arrayItem = [item, id];
            document.cookie = id + "=" + item; 
            //if there are no items in the valueArray,
            //go ahead and add it to the array            
            if (this.valueArray.length == 0) {
                this.valueArray.push(arrayItem);
            }
           //add the item as a cookie so the form can be autopoluated on refresh. 
          

            //go through each item in the array if there are values
            //look for a match in value array with new array value
            //if there is a match remove this item by its index value.
            else {
                $.each(forms.valueArray, function (index, value) {
                    //if there is a match between the arrays,
                    //remove the old and add the new. 
                    if (arrayItem.toString() == value.toString()) {
                        forms.valueArray.splice(index, 1); //remove the item from the array
                        forms.valueArray.push(arrayItem); //add the new value into the array
                       
                    }
                    else { var inside = false; }
                    //if content changes then remove old and add new 
                    if (forms.valueArray[index][1] == id) {
                        forms.valueArray.splice(index, 1);
                        forms.valueArray.push(arrayItem);
                    }
                    else { inside == false; } 
                    if ( inside == false )
                    {
                        forms.valueArray.push(arrayItem); 
                    }
                });
            }
             console.log(forms.valueArray); //console log the new array
        } //end of the submit function 
    };

    forms.htmlInject();
    forms.getVal('option', 'select');
    forms.getVal('fname', 'text');
    forms.getVal('radio', 'radio');
    forms.getVal('textbox', 'textarea');
    forms.getVal('check', 'checkbox');   
   
    //Problems
    /* Need to grab the values from the cookies and add them back to the form */
    //console.log( $("input[type='radio']").attr('name') );
     console.log( $("input[type='text']").attr('name') );
    
    
    $.each($('input'), function(key, value){
        //console.log($('input').eq(key).attr('name')); 
    });  
});