import { useState, useEffect, useRef } from 'react';
import './index.css';

interface Product {
    id: number;
    name: string;
    price: number;
}
interface CartItem {
    product: Product;
    qtd: number;
    total: number;
}
interface PaymentMethods {
    id: number;
    name: string;
    description: string;
}

const Cashier = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([]);

    const [cart, setCart] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);
    const totalProduct = useRef<HTMLInputElement>(null);
    const productName = useRef<HTMLInputElement>(null);
    const productPrice = useRef<HTMLInputElement>(null);
    const inputProductRef = useRef<HTMLInputElement>(null);
    const inputQtdRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const staticProducts = [
            { id: 1, name: 'Café', price: 5.0 },
            { id: 2, name: 'Pão', price: 2.0 },
            { id: 3, name: 'Leite', price: 4.0 },
            { id: 4, name: 'Suco', price: 3.5 },
        ];
        const paymentMethods = [
            { id: 1, name: 'Dinheiro', description: 'Pagamento em dinheiro' },
            { id: 2, name: 'Cartão', description: 'Pagamento em cartão' },
            { id: 3, name: 'Pix', description: 'Pagamento em Pix' },
        ];
        setProducts(staticProducts);
        setPaymentMethods(paymentMethods);
    }, []);

    const handleAddToCart = () => {
        const productId = parseInt(inputProductRef.current?.value || '0');
        if (isNaN(productId) || productId <= 0) {
            alert('Código do produto inválido');
            return;
        }

        const qtd = parseInt(inputQtdRef.current?.value || '1');
        if (isNaN(qtd) || qtd <= 0) {
            alert('Quantidade inválida');
            return;
        }

        const product = products.find(p => p.id === productId);
        if (!product) {
            alert('Produto não encontrado');
            return;
        }


        const totalPrice = product.price * qtd;
        if (!verifyProductExistInCart(productId)) {
            setCart([...cart, { product, qtd, total: totalPrice }]);

        } else {
            const newCart = cart.map((item) => {
                if (item.product.id === productId) {
                    return {
                        ...item,
                        qtd: item.qtd + qtd,
                        total: item.total + totalPrice,
                    };
                }
                return item;
            });
            setCart(newCart);
        }

        setTotal(total + totalPrice);

        if (inputProductRef.current) {
            inputProductRef.current.value = '';
            inputQtdRef.current!.value = '1';
            totalProduct.current!.value = totalPrice.toFixed(2);
            productName.current!.value = product.name;
            productPrice.current!.value = product.price.toFixed(2);
        }
    };

    const removeCartItem = (cartItem: CartItem) => {
        const newCart = cart.filter((item) => item !== cartItem);
        setCart(newCart);
        setTotal(total - cartItem.total);
    }

    function verifyProductExistInCart(productId: number) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const cartItem = cart.find((item) => item.product.id === productId);
            if (cartItem) {
                return true;
            }
        }
    }

    return (
        <div className="cashier">
            <div className="header">
                <h1>ZANDONA INFORMATICA LTDA</h1>
                <div className="header-right">
                    <p>Caixa: ADMINISTRADOR</p>
                    <p>18/09/24 16:37 Cx:01/1</p>
                </div>
            </div>
            <div className="content">
                <div className="left-column">
                    <h2>Produtos</h2>
                    {products.map((product) => (
                        <div className="product-card">
                            <h5>{product.id} {product.name}</h5>
                            <p>{product.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <div className="right-column">
                    <div className="input-section">
                        <div className="input-group">
                            <label htmlFor="inputQtdProduct">Qtd</label>
                            <input
                                ref={inputQtdRef}
                                type="text"
                                id='inputQtdProduct'
                                defaultValue="1"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="inputCode">Código</label>
                            <input
                                type="text"
                                id='inputCode'
                                ref={inputProductRef}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddToCart();
                                    }
                                }}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="inputUnitValue">Valor unitário</label>
                            <input type="text" id="inputUnitValue" ref={productPrice} /> 
                        </div>
                        <div className="input-group">
                            <label htmlFor="inputTotalValue">Valor total</label>
                            <input type="text" id="inputTotalValue" ref={totalProduct} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="productName">Produto</label>
                            <input type="text" id="productName" ref={productName} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="inputPaymentCondition">Condição de PGTO</label>
                            <input type="text" id="inputPaymentCondition" value={'1- À vista'} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="vendedor">Vendedor</label>
                            <input type="text" id="vendedor" />
                        </div>
                    </div>
                    <div className="cart-section">
                        <h3>NFC-e Nº 000075</h3>
                        {cart.map((item) => (
                            <div className="cart-item">
                                <p>{item.product.name} {item.qtd} {item.total.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="total-section">
                        <h3>Sub - Total</h3>
                        <p>{total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
<style>

</style>

export default Cashier;
