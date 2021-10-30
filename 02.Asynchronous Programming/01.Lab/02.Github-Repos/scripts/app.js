function loadRepos() {
	let username = document.querySelector('input').value;
	const ul = document.getElementById('repos')
	fetch(`https://api.github.com/users/${username}/repos`)
	.then(response => {
		if(!response.ok) {
			throw new Error(`${response.status} ${response.statusText}`);
		}

		return response.json();
	})
	.then(handleData)
	.catch(handleError);

	function handleData(d) {
		ul.innerHTML = '';
		d.forEach(e => {
			const a = document.createElement('a');
			const li = document.createElement('li');
			a.textContent = e.full_name;
			a.setAttribute('href', e.html_url);	
			li.appendChild(a);
			ul.appendChild(li);
		});
	}

	function handleError(e) {
		ul.innerHTML = '';
		ul.textContent = e.message;
	}
}