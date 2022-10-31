let orderlist = document.getElementById('order-list');

const clicked = async (event) => {
  let id = event.target.getAttribute('data-id');

  if (id !== null) {
    document.location.replace(`/orders/${id}`);
  }
};

orderlist.onclick = clicked;

document.querySelector('#navHome').setAttribute('class', '');
document.querySelector('#navCart').setAttribute('class', 'position-relative');
document.querySelector('#navOrders').setAttribute('class', 'active');
