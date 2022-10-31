const addToCartHandler = async (event) => {
  event.preventDefault();
  const product_id = event.target.getAttribute('data-pid');
  console.log(product_id);
  const response = await fetch('/api/cart/', {
    method: 'POST',
    body: JSON.stringify({ product_id }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('.all-products')
  .addEventListener('click', addToCartHandler);
