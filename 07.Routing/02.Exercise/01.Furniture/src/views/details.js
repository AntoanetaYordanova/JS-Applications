import { html } from "../lib.js";
import { del, get } from "../api/api.js";
import { getUserData, isUserLogged } from "../util.js";

const detailsTemplate = (data, isTheCreatior, onDelete) => {
  return html` <div class="row space-top">
  <div class="col-md-12">
      <h1>Furniture Details</h1>
  </div>
</div>
<div class="row space-top">
  <div class="col-md-4">
      <div class="card text-white bg-primary">
          <div class="card-body">
              <img .src=${'.' + data.img} />
          </div>
      </div>
  </div>
  <div class="col-md-4">
      <p>Make: <span>${data.make}</span></p>
      <p>Model: <span>${data.model}</span></p>
      <p>Year: <span>${data.year}</span></p>
      <p>Description: <span>${data.description}</span></p>
      <p>Price: <span>${data.price}</span></p>
      <p>Material: <span>${data.material}</span></p>
      <div>
          ${isTheCreatior ? html`<a href=”#” class="btn btn-info" href=${'/edit/' + data._id}>Edit</a>` : null}
          ${isTheCreatior ? html`<a href=”#” class="btn btn-red" @click=${(ev) => onDelete(ev, data._id)}>Delete</a>` : null}
      </div>
  </div>
</div>`
}

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const furnitureData = await get('/data/catalog/' + id);
  const userData = getUserData();
  let isTheCreatior;

  if(userData != null) {
    isTheCreatior = furnitureData._ownerId == userData.id;
  } else {
    isTheCreatior = false;
  }

  ctx.render(detailsTemplate(furnitureData, isTheCreatior,onDelete));

  async function onDelete(ev, id) {
    ev.preventDefault();
    await del('/data/catalog/' + id);
    ctx.page.redirect('/');
  }
  
}

