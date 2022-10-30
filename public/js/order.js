let orderlist = document.getElementById('order-list');

const clicked = async (event) => {
  event.preventDefault();

  let id = event.target.getAttribute('data-id');

  if (id !== null) {
    document.location.replace(`/api/products/${id}`);
  }
};

orderlist.onclick = clicked;
