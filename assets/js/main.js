let data = {};
const config = {
	accessToken: "yCNCO_0OL-Qr9izNHZI6qFj5asW4mAjFEjP5Kuzgh24",
	space: "89fdow13xkvm",
	host: "cdn.contentful.com",
};

const client = contentful.createClient(config);
let payload = {
	content_type: "home",
	include: 10,
};

client
	.getEntries(payload)
	.then((entry) => {
		data = entry;
		console.log(data);
		bindData();
	})
	.catch(console.error);

function bindData() {
	//Our Mission Statement
	document.getElementById("missionImage").src =
		data.items[0].fields.mission.fields.image.fields.file.url;
	document.getElementById("missionStatement").innerHTML =
		data.items[0].fields.mission.fields.description;

	//Our Values Section
	let ourValues = data.items[0].fields.values;
	let valuesData = "";
	ourValues.map((data) => {
		valuesData += `
    <div class="col-lg-6 col-sm-12">
                        <div class="card mx-auto">
                            <div class="our-values card-body d-inline-flex flex-row">
								<div class="row">
									<div class="col-3 our-value-img d-flex justify-content-center align-items-center">
										<img src="${data.fields.logo.fields.file.url}" />
									</div>
									<div class="col-9 our-value-content py-lg-5">
										<h3>${data.fields.title}</h3>
										<p>${data.fields.description}</p>
									</div>
								</div>
                            </div>
                        </div>
                    </div>
     `;
	});
	document.getElementById("our-values").innerHTML = valuesData;

	//Brands Section - Two Ads
	document.getElementById("brandsFirstAdLogo").src =
		data.items[0].fields.brands[0].fields.photo.fields.file.url;
	document.getElementById("brandsFirstAdDescription").innerHTML =
		data.items[0].fields.brands[0].fields.description;
	document.getElementById("brandsSecondAdLogo").src =
		data.items[0].fields.brands[1].fields.photo.fields.file.url;
	document.getElementById("brandsSecondAdDescription").innerHTML =
		data.items[0].fields.brands[1].fields.description;

	//Our Leadership section
	let leadershipArr = data.items[0].fields.leaderships;
	let cardData = "";
	leadershipArr.map((data) => {
		cardData += `
       <div class="col-md-6 col-sm-12 col-lg-4 col-xl-3 d-flex justify-content-center align-items-center flex-column">
                    <div class="img-leadership">
                        <img id="firstPersonImage" src="${data.fields.avatar.fields.file.url}"  />
                    </div>
                    <div class="content-leadership">
                        <h3 id="firstPersonName">${data.fields.name}</h3>
                        <p id="firstPersonRank" class="text-center">${data.fields.rank}</p>
                    </div>
                </div>
     `;
	});
	document.getElementById("leadership").innerHTML = cardData;

	//Social Links in footer
	// var facebook = document.getElementById("facebookLink");
	// facebook.href = data.items[0].fields.socialLinks.fields.facebook;
	var linkedIn = document.getElementById("linkedInLink");
	linkedIn.href = data.items[0].fields.socialLinks.fields.linkedin;
	// var twitter = document.getElementById("twitterLink");
	// twitter.href = data.items[0].fields.socialLinks.fields.twitter;
	// var instagarm = document.getElementById("instagramLink");
	// instagarm.href = data.items[0].fields.socialLinks.fields.instagram;
	// var youtube = document.getElementById("youtubeLink");
	// youtube.href = data.items[0].fields.socialLinks.fields.youtube;

	//Footer description
	// document.getElementById("footerDescription").innerHTML =
	// 	data.items[0].fields.footer.fields.description;
}
