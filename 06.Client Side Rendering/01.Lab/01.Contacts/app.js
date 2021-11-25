import { contacts } from "./contacts.js";
import {html, render} from 'https://unpkg.com/lit-html?module';

const card = (data) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${data.name}</h2>
        <button data-id=${data.id} class="detailsBtn" @click=${onDetails}>Details</button>
        <div class="details" id="1"}>
            <p>Phone number: ${data.phoneNumber}</p>
            <p>Email: ${data.email}</p>
        </div>
    </div>
</div>`

const contactsDiv = document.getElementById('contacts');

function onDetails(ev) {
    ev.target.nextSibling.nextSibling.style.display = 'block';

}

function onRender() {
    render(contacts.map(card), contactsDiv);
}

onRender();
/* 
    <div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: John</h2>
                <button class="detailsBtn">Details</button>
                <div class="details" id="1">
                    <p>Phone number: 0847759632</p>
                    <p>Email: john@john.com</p>
                </div>
            </div>
    </div>
*/