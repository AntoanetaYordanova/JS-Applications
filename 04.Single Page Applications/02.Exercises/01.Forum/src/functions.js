const topicsContainer = document.getElementById('topicsContainer');
const postCommentsSection = document.getElementById('postCommentsSection');

function getDate() {
  const currentFullDate = new Date();
  const date = currentFullDate.getDate();
  const month = currentFullDate.getMonth();
  const year = currentFullDate.getFullYear();
  const hour = currentFullDate.getHours();
  const minutes = currentFullDate.getMinutes();
  const seconds = currentFullDate.getSeconds();

  const fullDate = `${year}-${checkDate(month)}-${checkDate(date)}T${checkDate(
    hour
  )}:${checkDate(minutes)}:${checkDate(seconds)}`;

  return fullDate;
}

function checkDate(d) {
  return d < 10 ? `0${d}` : d;
}

export function createTopicSection(data) {
  const el = document.createElement('div');
  el.innerHTML = `<div class="topic-container">
    <div class="topic-name-wrapper"">
        <div class="topic-name">
            <a href="#" class="normal">
                <h2  data-id="${data._id}">${data.title}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${data.date}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${data.creator}</span></p>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>
    `;

  topicsContainer.appendChild(el);
}

export function getTopicData(ev) {
    ev.preventDefault();
    const data = new FormData(ev.target.parentElement.parentElement);
    const title = data.get('topicName');
    const creator = data.get('username');
    const postText = data.get('postText');
    const date = getDate();
  
    if (title == '' || creator == '' || postText == '') {
      return;
    }
    return { title, creator, postText, date };
  }

export async function showComments(id) {
  const mainViewSection = document.getElementById('mainView');
    const topicInfoSection = postCommentsSection.querySelector('#postCommentsSection .theme-content');0
    
    document.querySelector('#postCommentsSection form').addEventListener('submit', (ev) => {
        const commentData = getCommentInfo(ev);
        commentData.topicId = id;
        postComment(commentData);
        loadComments(id);
    });

  mainViewSection.style.display = 'none';
  postCommentsSection.style.display = '';

  const data = await getTopicDataById(id);
  const div = document.createElement('div');
  div.innerHTML = `<div class="comment">
  <div class="header">
      <img src="./static/profile.png" alt="avatar">
      <p><span>${data.creator}</span> posted on <time>${data.date}</time></p>

      <p class="post-content">${data.postText}</p>
  </div>
`;
  topicInfoSection.appendChild(div);

  loadComments(id);
}

async function loadComments(id) {
    const allComments = await getComments();
    const filteredComments  = Object.values(allComments).filter(c => c.topicId == id);
    const commentSections = postCommentsSection.querySelector('.comment');
    console.log(filteredComments);

    filteredComments.forEach(e => {
        const div = document.createElement('div');
        div.innerHTML = `<div id="user-comment">
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <p><strong>${e.username}</strong> commented on <time>${e.date}</time></p>
                <div class="post-content">
                    <p>${e.text}</p>
                </div>
            </div>
        </div>
    </div>
  </div>`;

  commentSections.appendChild(div);
    });
}

function getCommentInfo(ev) {
    ev.preventDefault();
    const form = document.querySelector('#postCommentsSection form');
    const data = new FormData(form);
    const text = data.get('postText');
    const username = data.get('username');
    const date = getDate();

    if(text == '' || username == '') {
        return;
    }

    form.reset();

    return {text, username, date};
}

            /* --- Requests --- */

async function getComments() {
    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
    
    if(res.ok != true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}

async function postComment(data) {
    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method : 'post',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    });

    if(res.ok != true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}

async function getTopicDataById(id) {
  const res = await fetch(
    'http://localhost:3030/jsonstore/collections/myboard/posts'
  );

  if (res.ok != true) {
    const response = await res.json();
    throw new Error(response.message);
  }

  const allTopics = await res.json();
  const currentTopic = Object.values(allTopics).find((e) => e._id == id);
  return currentTopic;
}
