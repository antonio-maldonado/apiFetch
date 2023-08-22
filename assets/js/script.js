//Function to retrieve data from API
async function fetchUsers(){   
    let response,responseJSON; 
    try{
        responseJSON = await fetch("https://reqres.in/api/users?delay=3");      //Fetch data with delay
    }catch(error){
        console.warn("Error, falló fetch");
    }

    try{
        response = await responseJSON.json();                             //Convert JSON to Object
    }catch(error){
        console.warn("Error, No se pudo convertir a JSON");
    }
    localStorage.setItem("users",JSON.stringify(response.data));                //Convert to String and save data in Local Storage 

    return response;                                                            //Return array of objects containing user data
}

/**Function to display user data in DOM
 * 
 * @param {Object} users 
 */
function displayUsers( users ){
    const userDIV = document.getElementById("users");                           //User data container
    
    const usersList = users.map( user =>                                        //Iterating array of objects
        //Table data
        `<div class="row data-row mw-100 ">                                     
            <div class="col-md-1 ">                                                 
                <div class="row row-data-responsive d-flex justify-content-center">
                    <div class="col-3 col-name text-center"><h5>ID</h5></div>
                    <div class="col-9 text-center"><p>${user.id}</p></div>
                </div>
            </div>
            <div class="col-md-2 ">
                <div class="row row-data-responsive text-center d-flex justify-content-center">
                    <div class="col-3 col-name text-center"><h5>First Name</h5></div>
                    <div class="col-9 text-center"><p>${user.first_name}</p></div>
                </div>
            </div>
            <div class="col-md-2 ">
                <div class="row row-data-responsive text-center d-flex justify-content-center">
                    <div class="col-3 col-name text-center"><h5>Last Name</h5></div>
                    <div class="col-9 text-center"><p>${user.last_name}</p></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="row row-data-responsive text-center d-flex justify-content-center">
                    <div class="col-3 col-name text-center"><h5>Email</h5></div>
                    <div class="col-9 text-center"><p>${user.email}</p></div>
                </div>
            </div>
            <div class="col-md-3 text-center">
                <div class="row row-data-responsive text-center d-flex justify-content-center">
                    <div class="col-3 col-name text-center"><h5>Imagen</h5></div>
                    <div class="col-9 text-center"><img src="${user.avatar}"></div>
                </div>
            </div>
        </div>` 
        ).join("");//Converting array of strings into one String

    userDIV.innerHTML = usersList ; //Displaying table user data in DOM
}

//Retrieve data from Local Storage and display it in DOM
function displayUsersLocalStorage(){    
    setTimeout(()=>{                                                            //Adding delay 100ms
    let users = localStorage.getItem( "users" );
    users = JSON.parse( users );

    displayUsers( users );
    }, 100 )
}

//Checking if LocalStorage lifespan's data have expired.
async function checking(){
    const createdAt = parseInt( localStorage.getItem( "lastDate" ) );           //Retrieving data from LocalStorage
    let diffDate = new Date().getTime() - createdAt;                            //Calculating how much time has been spent
    let users;

    if( diffDate >= 60000 ){                                                    //If it has been spent 1 minute
        resetDisplay();                                                         //Delete table data
        try{
            users = await fetchUsers();                                         //Fetching data with delay
        }catch(error){
            console.warn("Error, falló fetch");
        }

        displayUsers( users.data );                                             //Displaying data in DOM
    
        localStorage.setItem( "lastDate" , new Date().getTime() );              //Updating latest refresh
        
    }else{                                                                      //If it hasn't been spent 1 minute yet
        //console.log( diffDate );
        resetDisplay();                                                         //Delete table data
        displayUsersLocalStorage();                                             //Retrieving data from LocalStore and displaying it in DOM 
    }
}

function resetDisplay(){                                                        //Function to clear table data
    const userDIV = document.getElementById( "users" );
    userDIV.innerHTML = "";
}

const readButton = document.getElementById( "readButton" );                     

readButton.addEventListener( "click" , checking );                              //Expecting button to be pressed