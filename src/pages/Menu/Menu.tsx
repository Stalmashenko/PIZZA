
import { ChangeEvent, useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { Product } from '../../interfaces/product.interface';
import { PREFIX } from '../../helpers/API';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			// await new Promise<void>((resolve) => {
			// 	setTimeout(() => {
			// 		resolve();
			// 	}, 2000);
			// });
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name
				}
			});
			// API VIA FETCH
			// const res = await fetch(`${PREFIX}/products`);
			// if (!res.ok) {
			// 	return;
			// }
			// const data = await res.json() as Product[];
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};

	return <>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав' onChange={updateFilter}/>
		</div>
		<div>
			{error && <>{error}</>}
			{!isLoading && products.length > 0 && <MenuList products={products} />}
			{isLoading && <>Загружаем продукты...</>}
			{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
		</div>
	</>;
}

export default Menu;