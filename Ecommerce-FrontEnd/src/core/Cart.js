import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import styles from './Cart.module.css'
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div className>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <Card
                    styleClass="col-6 mb-3 mt-3"
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    return (
        <div className={styles.container}>
        <div className={styles.header}>
        <h1 className={`${styles.jumbo} ${styles.jumbo_text_animated}`}>Cart</h1>
        </div>
          
            <div className="row">
                <div className="col-8">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

                <div className="col-4">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </div>
    );
};

export default Cart;
