(function(){

	var actual = 0;
	var ancho = 600;


	var $slideshow = $(".slideShow ul");
	var slide = $slideshow.find("li").length;
	var $puntos = $(".slideShowButtons");

	$puntos.find("div").eq(0).css({
		backgroundColor: "#58167d"
	})

	// correr automaticamente los slide cada intervalo de tiempo 
	var intervalo = setInterval(function(){
		mover("sig");
	}, 1500 );


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

		tl.to( $slideshow, 1, {
			marginLeft: margen,
			ease: Circ.easeOut
		}).to( $puntoActual, 0.5, { backgroundColor: "#58167d" }, "-=1.2" )
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

}());