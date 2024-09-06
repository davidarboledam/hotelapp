import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import StarGenerator from '../shared/StarGenerator';
import './styles/Reviews.css';

const Reviews = ({ hotelId }) => {
	const [visibleComments, setVisibleComments] = useState(5);
	const [reviewsHotel, getReviewsHotel] = useFetch();
	useEffect(() => {
		const url = `https://hotels-api.academlo.tech/reviews?hotelId=${hotelId}`;

		getReviewsHotel(url);
	}, [hotelId]);

	const handleReviews = () => {
		setVisibleComments((prevCount) => prevCount + 5);
	};

	return (
		<div className="reviews">
			<h3 className="reviews__title">Comments</h3>
			<div className="reviews__container">
				{reviewsHotel?.results.slice(0, visibleComments).map((review) => (
					<ul className="reviews__list " key={review.id}>
						<li className="reviews__list-title">{review.user.firstName}</li>
						<li className="reviews__list-text">{review.comment}</li>
						<div className="reviews__stars-container">
							<li className="reviews__list-stars">
								<StarGenerator rating={review.rating} />
							</li>
							<li className="reviews__list-value">{review.rating}</li>
						</div>
					</ul>
				))}
			</div>
			{visibleComments < reviewsHotel?.results.length && (
				<button className="reviews__btn" onClick={handleReviews}>
					Show more
				</button>
			)}
		</div>
	);
};

export default Reviews;
