
import { get, put } from "../api/api.js";
import { html } from "../lib.js";

const editTemplate = (data, errorMsg, errors, onSubmit, isEdit) => {
   return html` <div class="row space-top">
   <div class="col-md-12">
       <h1>Edit Furniture</h1>
       <p>Please fill all fields.</p>
   </div>
</div>
${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : null}

<form @submit=${onSubmit}>
   <div class="row space-top">
       <div class="col-md-4">
           <div class="form-group">
               <label class="form-control-label" for="new-make">Make</label>
               <input class=${'form-control ' + (isEdit ? (errors.make ? 'is-invalid' : 'is-valid') : '')} id="new-make" type="text" name="make" value=${data.make}>
           </div>
           <div class="form-group has-success">
               <label class="form-control-label" for="new-model">Model</label>
               <input class=${'form-control ' + (isEdit ? (errors.model ? 'is-invalid' : 'is-valid') : '')} id="new-model" type="text" name="model" value=${data.model}>
           </div>
           <div class="form-group has-danger">
               <label class="form-control-label" for="new-year">Year</label>
               <input class=${'form-control ' + (isEdit ? (errors.year ? 'is-invalid' : 'is-valid') : '')} id="new-year" type="number" name="year" value=${data.year}>
           </div>
           <div class="form-group">
               <label class="form-control-label" for="new-description">Description</label>
               <input class=${'form-control ' + (isEdit ? (errors.description ? 'is-invalid' : 'is-valid') : '')} id="new-description" type="text" name="description" value=${data.description}>
           </div>
       </div>
       <div class="col-md-4">
           <div class="form-group">
               <label class="form-control-label" for="new-price">Price</label>
               <input class=${'form-control ' + (isEdit ? (errors.price ? 'is-invalid' : 'is-valid') : '')} id="new-price" type="number" name="price" value=${data.price}>
           </div>
           <div class="form-group">
               <label class="form-control-label" for="new-image">Image</label>
               <input class=${'form-control ' + (isEdit ? (errors.img ? 'is-invalid' : 'is-valid') : '')} id="new-image" type="text" name="img" value=${data.img}>
           </div>
           <div class="form-group">
               <label class="form-control-label" for="new-material">Material (optional)</label>
               <input class=${'form-control ' + (isEdit ? (errors.material ? 'is-invalid' : 'is-valid') : '')} id="new-material" type="text" name="material" value=${data.material ? data.material : ''}>
           </div>
           <input type="submit" class="btn btn-info" value="Edit" />
       </div>
   </div>
</form>`
}

export async function editPage(ctx) {
   const furnitureId = ctx.params.id;
   const furnitureData = await get('/data/catalog/' + furnitureId);

   update();

   function update(errorMsg, errors = {}, isEdit){
      ctx.render(editTemplate(furnitureData, errorMsg, errors, onSubmit, isEdit));
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

         const newData = {
            make,
            model,
            year,
            description,
            price,
            img,
            material,
            id : furnitureId
         }

         const url = '/data/catalog/' + furnitureId;
         await put(url, newData);
         ctx.page.redirect('/');

      } catch (err) {
         const message = err.message || err.error.message;
         update(message, err.errors, true);
      }
   }
}


