(function(){

	var actual = 0;
	var ancho = 600;


	var $slideshow = $(".slideShow ul");
	var slide = $slideshow.find("li").length;

	// correr automaticamente los slide cada intervalo de tiempo 
	var intervalo = setInterval(function(){
		mover("sig");
	}, 1500 );


	function mover( dir, click ){

		if( click )
			clearInterval( intervalo );

		( dir === "sig" ) ? actual-- : actual++; 

		if( actual > 0){
			actual = ( slide -1) * -1;
		}else if ( actual <= ( slide * -1 ) ){
			actual = 0
		}

		console.log( actual );
		

		var margen = actual * ancho;

		// Animacion con GSAP
		var tl = new TimelineMax();

		tl.to( $slideshow, 1, {
			marginLeft: margen,
			ease: Circ.easeOut
		});

		// Animacion con Animate
		// $slideshow.animate({
		// 	marginLeft: margen
		// }, 400);
		


	}

	$(".botSlide").on("click", function(){

		var dir = $(this).data("mov");

		mover( dir, true );
	});

}());