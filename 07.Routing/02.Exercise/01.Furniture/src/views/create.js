import { post } from "../api/api.js";
import { html } from "../lib.js";

const createTemplate = (errorMsg, errors, onSubmit, isEdit) => html` <div class="row space-top">
<div class="col-md-12">
    <h1>Create New Furniture</h1>
    <p>Please fill all fields.</p>
</div>
</div>
${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : null}
<form @submit=${onSubmit}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input class=${'form-control ' + (isEdit ? (errors.make ? 'is-invalid' : 'is-valid') : '')} id="new-make" type="text" name="make">
        </div>
        <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input class=${'form-control ' + (isEdit ? (errors.model ? 'is-invalid' : 'is-valid') : '')} id="new-model" type="text" name="model">
        </div>
        <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input class=${'form-control ' + (isEdit ? (errors.year ? 'is-invalid' : 'is-valid') : '')} id="new-year" type="number" name="year">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-description">Description</label>
            <input class=${'form-control ' + (isEdit ? (errors.description ? 'is-invalid' : 'is-valid') : '')} id="new-description" type="text" name="description">
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input class=${'form-control ' + (isEdit ? (errors.price ? 'is-invalid' : 'is-valid') : '')} id="new-price" type="number" name="price">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input class=${'form-control ' + (isEdit ? (errors.img ? 'is-invalid' : 'is-valid') : '')} id="new-image" type="text" name="img">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input class=${'form-control ' + (isEdit ? (errors.material ? 'is-invalid' : 'is-valid') : '')} id="new-material" type="text" name="material">
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
    </div>
</div>
</form>`

export function createPage(ctx) {
  update();

  function update(errorMsg, errors = {}, isEdit){
     ctx.render(createTemplate(errorMsg, errors, onSubmit, isEdit));
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

      const make = formData.get('make');
      const model = formData.get('model');
      const year = formData.get('year');
      const description = formData.get('description');
      const img = formData.get('img');
      const material = formData.get('material');
      const price = formData.get('price');

      
      try {
         if(make == '' || model == '' || year == '' || description == '' || img == '' || price == '') {
            throw {
               error : new Error('Please fill all required fields'),
               errors : {
                  make : make == '',
                  model : model == '',
                  year : year == '',
                  description : description == '',
                  img : img == '',
                  price : price == ''
               }
            }
         }

         if(make.length < 4) {
            throw {
               error : new Error('Make must be at least 4 symbols long'),
               errors : {
                  make : true,
                  model : false,
                  year : false,
                  description : false,
                  img : false,
                  price : false
               }
            } 
         }

         if(model.length < 4) {
            throw {
               error : new Error('Model must be at least 4 symbols long'),
               errors : {
                  make : false,
                  model : true,
                  year : false,
                  description : false,
                  img : false,
                  price : false
               }
            } 
         }

         if(Number(year) < 1950 || Number(year) > 2050) {
            throw {
               error : new Error('Year must be between 1950 and 2050'),
               errors : {
                  make : false,
                  model : false,
                  year : true,
                  description : false,
                  img : false,
                  price : false
               }
            } 
         }

         if(description.length <= 10) {
            throw {
               error : new Error('Description must be more than 10 symbols long'),
               errors : {
                  make : false,
                  model : false,
                  year : false,
                  description : true,
                  img : false,
                  price : false
               }
            } 
         }

         const data = {
            make,
            model,
            year,
            description,
            price,
            img,
            material,
         }

         const url = '/data/catalog/';
         await post(url, data);
         ctx.page.redirect('/');

      } catch (err) {
         const message = err.message || err.error.message;
         update(message, err.errors, true);
      }
  }
}

/*{
  "_ownerId": "847ec027-f659-4086-8032-5173e2f9c93a",
  "make": "Sofa",
  "model": "ES-549-M",
  "year": 2018,
  "description": "Three-person sofa, blue",
  "price": 1200,
  "img": "./images/sofa.jpg",
  "material": "Frame - steel, plastic; Upholstery - fabric",
  "_createdOn": 1615545572296,
  "_id": "f5929b5c-bca4-4026-8e6e-c09e73908f77"
} */