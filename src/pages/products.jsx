import { useDispatch, useSelector } from "react-redux";
import { productSelectors, getProducts } from "../store/products";
import { useEffect } from "react";

export default function ProductPage() {
  const dispatch = useDispatch();
  const products = useSelector(productSelectors);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  console.log(products);

  return (
    <>
      <div className="">
        <div className="gap-6 grid sm:grid-cols-1 md:flex">hello</div>
      </div>
    </>
  );
}
