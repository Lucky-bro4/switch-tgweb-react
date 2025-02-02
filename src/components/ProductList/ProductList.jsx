import React, {useState, useEffect, useCallback, useContext} from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { AppContext } from '../../context/AppContext';
import ProductModal from "../ProductModal/ProductModal";
import Header from "../Header/Header"
import './ProductList.css';

const ProductList = () => {

    const { products, filteredProducts, setFilteredProducts } = useContext(AppContext);
    const { tg } = useTelegram();

    const [costs, setCosts] = useState(260)
    const [order, setOrder] = useState(0)
    const [closedChainOrder, setClosedChainOrder] = useState(false)
    const [newUser, setNewUser] = useState(false)

    const [alertShown, setAlertShown] = useState(false)


    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useState({ query: '', filters: {}, gender: '' });


    const handleFilterChange = (params) => {
        setSearchParams(params);
    };

    useEffect(() => {
        if (tg.MainButton.isVisible && !isModalOpen) {
            tg.MainButton.hide();
        }
    }, [tg, isModalOpen]);

    useEffect(() => {
        applyFilters(searchParams);
    }, [searchParams]);

    const applyFilters = ({ query, filters }) => {
        let updatedProducts = products || [];
    
        if (filters?.category) {
            updatedProducts = updatedProducts.filter(product => product.category === filters.category);
        }
    
        if (filters?.priceRange) {
            updatedProducts = updatedProducts.filter(product => {
                switch (filters.priceRange) {
                case 'до 1000':
                    return product.price < 1000;
                case '1000-3000':
                    return product.price >= 1000 && product.price <= 3000;
                case '3000-5000':
                    return product.price > 3000 && product.price <= 5000;
                case 'от 5000':
                    return product.price > 5000;
                default:
                    return true;
                }
            });
        }

        if (filters?.gender) {
            updatedProducts = updatedProducts.filter(
                product => product.gender === filters.gender
            );
        }
 
        if (query) {
            updatedProducts = updatedProducts.filter(product =>
                product.category.toLowerCase().includes(query.toLowerCase())
            );
        }
    
        setFilteredProducts(updatedProducts);
    };

    const onProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    }


    return (
        <div>
            <Header />
            <SearchComponent onFilterChange={handleFilterChange} />
            <div className={`list ${isModalOpen ? 'no-scroll' : ''}`}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(item => (
                        <ProductItem
                            key={item.id}
                            product={item}
                            // onAdd={onAdd}
                            onClick={() => onProductClick(item)}
                            className={'item'}
                            closedChainOrder={closedChainOrder}
                        />
                    ))
                ) : (
                    <div className="no-products">
                        Не нашли товары по заданному условию 😞
                    </div>
                )}
            </div>
            {isModalOpen && selectedProduct && (
                <ProductModal
                    product={selectedProduct} 
                    onClose={closeModal} 
                />
            )}
        </div>
    );
};

export default ProductList;
