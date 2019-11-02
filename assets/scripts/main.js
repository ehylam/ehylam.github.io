// @codekit-prepend "src/jquery-3.4.1.min.js" , "src/three.min.js","src/TimelineMax.min.js","src/aos.js", "src/TweenMax.min.js","src/ScrollMagic.min.js","src/animation.gsap.js";
$(document).ready(function() {
	// AOS.init();
	function main() {
		const canvas = document.querySelector('#c');
		const renderer = new THREE.WebGLRenderer({ alpha: true });

		const fov = 75;
		const aspect = 2; // the canvas default
		const near = 0.1;
		const far = 5;
		const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		camera.position.z = 2;

		const scene = new THREE.Scene();

		const boxWidth = 1;
		const boxHeight = 1;
		const boxDepth = 1;
		const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

		const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 }); // greenish blue

		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		function render(time) {
			time *= 0.001; // convert time to seconds

			cube.rotation.x = time;
			cube.rotation.y = time;

			renderer.render(scene, camera);

			requestAnimationFrame(render);
		}
		requestAnimationFrame(render);
	}

	main();
});
