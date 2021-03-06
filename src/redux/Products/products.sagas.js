import { auth } from '../../firebase/firebase.utils';
import { takeLatest, put, all, call } from 'redux-saga/effects'
import { setProducts, fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from './products.actions';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct } from './Products.helper';
import productsTypes from './products.types';

export function* addProduct({ payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice
} }) {

    try {
        const timestamp = new Date();
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        });
        yield put(
            fetchProductsStart()
        );


    } catch (err) {
        // console.log(err);
    }

}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts() {
    try {
        const products = yield handleFetchProducts();
        yield put(
            setProducts(products)
        );
        console.log("fetchproduct");
        yield put(fetchProductsSuccess(products))
    } catch (err) {
        yield put(fetchProductsFailure(err))
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
    try {
        yield handleDeleteProduct(payload);
        yield put(
            fetchProductsStart()
        );

    } catch (err) {
        // console.log(err);
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
    ])
}