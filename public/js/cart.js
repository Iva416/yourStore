const delButtonHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-pid')) {
    const pid = event.target.getAttribute('data-pid');
    const cid = event.target.getAttribute('data-cid');

    const response = await fetch('/api/cart', {
      method: 'DELETE',
      body: JSON.stringify({ pid, cid }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('good');
      document.location.replace('/cart');
    } else {
      alert('Failed to delete project');
    }
  }
};

const submitButtonHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-cart')) {
    const cid = event.target.getAttribute('data-cart');

    const response = await fetch(`/api/cart/submit/${cid}`, {
      method: 'POST',
    });

    if (response.ok) {
      //   console.log(await response.json());
      document.location.replace('/api/cart');
    } else {
      alert('Shopping Cart is Empty~! Please add some products first.');
    }
  }
};

document
  .querySelector('.product-list')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('#submit-cart')
  .addEventListener('click', submitButtonHandler);
