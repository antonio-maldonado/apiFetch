(async function () {                                                        //IIFE to charge initial data and update it afterwards
    if( localStorage.getItem( "lastDate" ) ){                               //If lastDate exists(user has entered before)
        checking();                                                         //Cheking how much time has spent
        
    }else{                                                                  //If there is no date
        localStorage.setItem( "lastDate" , new Date().getTime() );          //Saving a new date in LocalStorage
        let users;                               
    
        try{
            users = await fetchUsers();                                     //Retrieving user data with delay
        }catch(error){
            console.warn("Error, falló fetch");
        }

        displayUsers( users.data );                                         //Displaying data in DOM
    }
  })();