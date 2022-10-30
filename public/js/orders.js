let orderlist = document.getElementById('order-list');

const clicked = async (event) => {
  let id = event.target.getAttribute('data-id');

  if (id !== null) {
    document.location.replace(`/api/orders/${id}`);
  }
};

orderlist.onclick = clicked;
