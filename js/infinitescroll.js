'use strict';

//piszemy funkcję ajax i przekazujemy jej parametr z opcjami, ta funkcja będzie napisana w pełni obiektowo:
function ajax(ajaxOptions) {
	var options = { //definiujemy obiekt i jego właściwości:
		type: ajaxOptions.type || 'GET', //tutaj definiujemy typ połączenia
		url: ajaxOptions.url || '', //tutaj kod URL
		onSuccess: ajaxOptions.onSuccess || function(){}, //jak sie uda odebrac wszystkie dane (SUKCES), to tutaj przekazujemy w tym obkiecie metodę z tym, co dalej funkcja ma robic
		//teraz piszemy obslugę błędow, przekazemy mu metodę, ktora pozwoli ten blad obsluzyc:
		onError: ajaxOptions.onError || function(){},
		dataType: ajaxOptions.dataType || 'tekst' //tutaj definiujemy typ danych, w jakim formacie dostaniemy nasze dane LUB (||) tekst jako format domyslny
	};
	
	//piszemy funkcje, ktora sprawdzi czy nasze polaczenie http zakonczylo sie sukcesem:
	function httpSuccess(httpRequest) { //uzywamy w tej funkcji techniki przechwytywania błędow:
		try { //konstrukcja try/catch sprawdza nam czy sam kod nie wyrzuci bledow, jezeli wylapie bledy tego kodu, to przejdzie do catch'a i zwroc false, ze mamy blad (np. mamy cos zle przekazane w kodzie) - jest to konstrukcja do sprawdzania, czy w samym kodzie są jakieś błędy
			return (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 || navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefined')
		} catch(err) { //err od error - błąd; catch sprawdza poprawnosc kodu wpisanego po funkcji try
			return false;
		}
	}
	
	
	
	//definiujemy glowny obiekt, ktory bedzie instancja klasy:
	var httpReq = new XMLHttpRequest;
	
	httpReq.open(options.type, options.url, true);
	
	httpReq.onreadystatechange = function() { //sprawdzany status/stan 
		
		if(httpReq.readyState == 4) {
			if(httpSuccess(httpReq)) {
			
				var returnData = (options.dataType == 'xml') ? httpReq.responseXML : httpReq.responseText; //jezeli to (options.dataType == 'xml') jest prawda, to zwroc httpReq.responseXML; jezeli falsz to zwroc httpReq.responseText;
			
				options.onSuccess(returnData);
		   
		   
		   
			} else {
				options.onError(httpReq.statusText); //zwroci nam status połączenia
			}
		}
	}	
	
	httpReq.send();	
}


//pobieranie kolejnych danych bez konca w zaleznosci od tego, ze scrollujemy strone do dolu:

window.onscroll = function() {
	
	if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
		ajax({
			type: 'GET',
			url: 'https://jsonplaceholder.typicode.com/users',
			onSuccess: function(response) {
			
			var jsonObj = JSON.parse(response);
				
			console.log(jsonObj[0]);
				
			for (var i = 0; i<jsonObj.length; i++) {
				
				var parID = document.createElement('p');
				var parName = document.createElement('p');
				var parURL = document.createElement('p');

				parID.innerHTML = "User ID " + jsonObj[i].id;
				parName.innerHTML = "User Name " + jsonObj[i].name;
				parURL.innerHTML = "User Email " + jsonObj[i].email;

				document.body.appendChild(parID);
				document.body.appendChild(parName);
				document.body.appendChild(parURL);
			 }
		
			
		   }
	
		});
	 }
	
	
}

