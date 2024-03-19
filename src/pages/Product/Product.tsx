import { Await, useParams, useLoaderData, useNavigate} from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import Headling from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import styles from './Product.module.css';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export function Product() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();
	const data = useLoaderData() as { data: Product };

	const back = () => {
		navigate('/');
	};

	const increase = () => {
		dispatch(cartActions.add(Number(id)));
	};

	return <>
		<Suspense fallback={<>Загружаю!! {id}</>}>
			<Await
				resolve={data.data}
			>
				{({ data }: { data: Product }) => (
					<div className={styles['container']}>
						<div className={styles['head']}>
							<button className={styles['back-button']} onClick={back}>
								<img src="/back.svg" />
							</button>
							<Headling>{data.name}</Headling>
							<Button className={styles['add-button']} onClick={increase}>
								<img src="/cart-button-icon.svg"/>
								&nbsp; В корзину
							</Button>
						</div>
						<div className={styles['content']}>
							<div className={styles['photo']}>
								<img src={data.image} alt='Фото продукта'/>
							</div>
							<div className={styles['description']}>
								<div className={styles['row']}>
									<span>Цена</span>
									<span className={styles['price']}>{data.price} &nbsp;
										<span className={styles['currency']}>₽</span>
									</span>
								</div>
								<div className={styles['row']}>
									<span>Рейтинг</span>
									<span className={styles['rating']}>{data.rating}&nbsp;
										<img src="/star-icon.svg" alt="Иконка звезды" />
									</span>
								</div>
								<div>Состав:</div>
								<div>
									<ul>
										{
											data.ingredients.map((i, index) => { return <li  key={index}>{i}</li>;})
										}
									</ul>
								</div>
							</div>
						</div>
					</div>
				)}
			</Await>
		</Suspense>
	</>;
}