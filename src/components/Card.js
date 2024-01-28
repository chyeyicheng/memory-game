const cover = "/img/card/cover.png";

export default function Card({ src , handleChoice , flipped}) {

	const handleClick = () =>{
		handleChoice(src);
	}


	return (
		<div className="flex justify-center items-center" onClick={handleClick}>
			<div className="card">
				<div className={`card-front justify-center items-center h-full w-full ${flipped ? "flex" : "hidden"}`}>
					<img src={src.src} alt="card" />
				</div>
				<div className={`card-back justify-center items-center h-full w-full ${flipped ? "hidden" : ""}`}>
					<img src={cover} alt="card" className="h-full w-full" />
				</div>
			</div>
		</div>
	);
}
