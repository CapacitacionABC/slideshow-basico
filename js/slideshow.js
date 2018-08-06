(function(){

	$.slideshow = function( opciones ){

		opciones = $.extend({
			divDestino: ".slideShow",
			intervalo: 1500,
			ancho: 600,
			velocidad: 1200,
			slides: [],
			color: "#ba007c"
		}, opciones );

		if( opciones.slides.length == 0 ){
			alert("Los slides son necesarios");
			return;
		}

		opciones.velocidad = opciones.velocidad / 1000;

		var actual = 0;
		var ancho = opciones.ancho;


		var slide = opciones.slides.length;

		// creacion de slides
		var contenido = "";

			contenido += "<ul>"
				for (var i = 0; i < opciones.slides.length; i++ ) {
					contenido += '<li><img src="'+ opciones.slides[i] +'"></li>';
				}
			contenido += "</ul>"; 

		$( opciones.divDestino ).append( contenido );

		var $slideshow = $( opciones.divDestino + " ul");

		// Creacion de los botones

		contenido = "";
		contenido += '<div class="slideShowButtons">';
		for (var i = 0; i < opciones.slides.length; i++ ) {
			contenido += '<div data-idx="'+ i +'" class="slideButton"></div>';
		}
		
		contenido += '<div';

		$( opciones.divDestino ).append( contenido );


		var $puntos = $(".slideShowButtons");

		$puntos.find("div").eq(0).css({
			backgroundColor: opciones.color
		})

		// correr automaticamente los slide cada intervalo de tiempo 
		var intervalo = setInterval(function(){
			mover("sig");
		}, opciones.intervalo );


		function mover( dir, click ){

			( dir === "sig" ) ? actual-- : actual++; 

			if( actual > 0){
				actual = ( slide -1) * -1;
			}else if ( actual <= ( slide * -1 ) ){
				actual = 0
			}
			
			mover_por_punto( actual, click );
		}


		function mover_por_punto( actual, click ){

			if( click )
				clearInterval( intervalo );


			var margen = actual * ancho;
			var idx = actual * -1;
			var $puntoActual = $puntos.find("div").eq( idx );
			var $demasPuntos = $puntos.find("div").not( $puntoActual );

			// Animacion con GSAP
			var tl = new TimelineMax();

			tl.to( $slideshow, opciones.velocidad, {
				marginLeft: margen,
				ease: Circ.easeOut
			}).to( $puntoActual, 0.5, { backgroundColor: opciones.color }, "-=1.2" )
			  .to( $demasPuntos, 0.5, { backgroundColor: "#a1a1a1" }, "-=1.2" );

			// Animacion con Animate
			// $slideshow.animate({
			// 	marginLeft: margen
			// }, 400);

		}

		$(".slideButton").on("click", function(){

			var idx = $(this).data("idx");
			idx = idx * -1;
			mover_por_punto( idx, true );
			
			
		})

		$(".botSlide").on("click", function(){

			var dir = $(this).data("mov");

			mover( dir, true );
		});


	};

}());