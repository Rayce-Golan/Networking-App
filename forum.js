	function openForum() {
	  document.getElementById("myForm").style.display = "block";
	}
	function closeForum() {
	  document.getElementById("myForm").style.display = "none";
	}

	  /*
	  $('#post').click(function() {
		  $('#forumbox').append($('<li class="flex-item">').text('Hello'));
		  $(this).insertAfter($('[class="flex-item"]').last());
	  }); 

	  */

	function openprofile() {
	  
	}

	function postForum(){
	  $('#forumbox').append($('<li class="flex-item">').text('Hello'));
	  $(this).insertAfter($('[class="flex-item"]').last());
	} 
	
	document.getElementById("WRITEFORUM").addEventListener("click", e => {
		openForum();
	});
	document.getElementById("CLOSEFORUM").addEventListener("click", e => {
		closeForum();
	});
	document.getElementById("post").addEventListener("click", e => {
		postForum();
	});
	
	//firebase
	
	firebase.auth().onAuthStateChanged(user => {
		if(user) {
			getUserName();
		}
		else {
			window.location.href = "/login.html";
		}
	});
	
	const logoutbtn = document.getElementById("LOGOUTBTN");
	const usernametxt = document.getElementById("USERNAME");
	
	var firestore = firebase.firestore();
	var userName = ""
	
	
	var userDocRef = "";
	
	
	
	function getUserName(){
		if (firebase.auth().currentUser !== null) {
			userDocRef = firestore.doc("Users/"+firebase.auth().currentUser.uid);
		}
		if (userDocRef !== "") {
			userDocRef.onSnapshot(function (doc) {
				if (doc && doc.exists) {
					const docdata = doc.data();
					usernametxt.innerHTML = "Welcome back " + docdata.UserName + "!";
				}
			})
		}	
	}
	
	realtimeUserUpdate = function() {
		getUserName();
	}
	
	logoutbtn.addEventListener("click", e => {
		firebase.auth().signOut();
	});