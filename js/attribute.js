
// function plates_left(){
//     let plates_left_count ;
//     if(window.XMLHttpRequest)
//     {
//       obj=new XMLHttpRequest();
//     }
//     else
//     {
//       obj=new ActiveXObject('Microsoft.XMLHTTP');
//     }
//     obj.open("GET","https://khasbiryani.000webhostapp.com/reader.php",true);
//     obj.send();
//     obj.onreadystatechange=function()
//     {
//     if(obj.readyState==4 && obj.status==200)
//     {
//         // return obj.responseText;
//       value=obj.responseText;
//                 // console.log(value);
//                 plates_left_count = value;
//                 console.log(plates_left_count);


//             }
//             }
//             console.log(plates_left_count);
//             return plates_left_count;

// }

function plates_left() {
    // Create a Promise object
     return new Promise((resolve, reject) => {
      // Create the AJAX request
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "https://khasbiryani.000webhostapp.com/reader.php", true);
  
      // Handle response received
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Parse and resolve with extracted value
            let platesLeftCount = JSON.parse(xhr.responseText); // assuming JSON response
            resolve(platesLeftCount);
          } else {
            // Reject with error information
            reject(new Error("Error fetching data: " + xhr.statusText));
          }
        }
      };
  
      // Send the request
      xhr.send();
    });
  }
  
  // Using the function
  
function check_plates_order(){
    plates_left()
    .then(platesLeft => {
        console.log(platesLeft);
        var numOptions = platesLeft; // Update this to your desired number of options
      
        // Select your select element
        var selectElement = $("#count");
      
        // Loop through the numbers and create options
        for (var i = 1; i <= numOptions; i++) {
          selectElement.append("<option value='" + i + "'>" + i + "</option>");
        }
    })
    .catch(error => {
      console.error("Error retrieving plates:", error);
    });

}
function update_plates_left(){


    plates_left()
    .then(platesLeft => {
        plates_left_count = platesLeft;
    document.getElementById('plates-left').innerHTML = plates_left_count;
        console.log(platesLeft);
    if(plates_left_count==0){
        $(".order-now-btn").addClass("hide");
    }
    else{
        
            if ($('.order-now-btn').hasClass('hide')) {
              $('.order-now-btn').removeClass('hide');
            }
         
          
    }
    })
    .catch(error => {
      console.error("Error retrieving plates:", error);
    });
    
}


function order_submit(){
    console.log("form submitted");
}

  