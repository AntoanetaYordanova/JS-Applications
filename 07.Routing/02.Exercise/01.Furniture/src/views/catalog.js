import { get } from '../api/api.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const catalogTemplate = (furnitures) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Welcome to Furniture System</h1>
      <p>Select furniture from the catalog to view details.</p>
    </div>
  </div>
  <div class="row space-top">
     ${furnitures.map(f => {
        return html`<div class="col-md-4">
      <div class="card text-white bg-primary">
        <div class="card-body">
          <img src=${f.img} />
          <p>${f.description}</p>
          <footer>
            <p>Price: <span>${f.price} $</span></p>
          </footer>
          <div>
            <a href="/details/${f._id}" class="btn btn-info">Details</a>
          </div>
        </div>
      </div>
    </div>`
     })}
    
  </div>
`;

export async function catalogPage(ctx) {

  const userPage = ctx.pathname == '/my-furniture'

   const furnitures = await getFurnitures(userPage);
   ctx.render(catalogTemplate(furnitures));
}

async function getFurnitures(userPage){
   let data;
   if(userPage) {
      const id = getUserData().id;
      data = await get(`/data/catalog?where=_ownerId%3D%22${id}%22`);
   } else {
      data =  await get('/data/catalog');
   }

   return data;
}