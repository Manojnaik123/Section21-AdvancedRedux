import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_DATA = [
  {
    id: 'p1',
    price: 6,
    title: 'My first book',
    description: 'My first book I ever made'
  },
  {
    id: 'p2',
    price: 3,
    title: 'My second book',
    description: 'My second book I ever made'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map(item => (
          <ProductItem
          key={item.id}
          id = {item.id}
          title= {item.title}
          price={item.price}
          description={item.description}
        />
        ))}
      </ul>
    </section>
  );
};

export default Products;
