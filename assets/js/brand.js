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
		bindData();
	})
	.catch(console.error);

function bindData() {
	//About Us description
	document.getElementById("aboutUsDescription").innerHTML =
		data.items[0].fields.aboutUs;

	//Our Brands
	let brandData = data.items[0].fields.allBrands;

	let brandCardData = "";
	let lastIndex = brandData.length - 1;

	brandData.map((data, index) => {
		if (index == lastIndex) {
			brandCardData += `
              <div class="col-sm-12 col-md-12 col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <div 
                                    class="d-flex w-100 align-items-center justify-content-around flex-column flex-md-row ">
                                    <img class="mb-4 "
                                        src="${data.fields.photo.fields.file.url
				}"" alt="" />
                                    <img class="mb-4 "
                                        src="${data.fields.logo2.fields.file.url
				}"/>
                                    <img class="mb-4 "
                                        src="${data.fields.logo3.fields.file.url
				}"" alt="" />
                                </div>
                                <div class="card-text-outside px-3 px-lg-0 py-3     ">
                                    <p class="card-text">
                                   ${data.fields.description}
                                    </p>
                                </div>
                                <div class="card-links d-flex justify-content-evenly w-100 py-4">
                                    <a target="_blank" href="${"https://" + data.fields.linkTarget
				}">${data.fields.link}</a>
                                    <a  target="_blank" href="${"https://" + data.fields.linkTarget2
				}">${data.fields.link2}</a>
                                    <a  target="_blank" href="${"https://" + data.fields.linkTarget3
				}">${data.fields.link3}</a>
                                </div>
                            </div>
                        </div>
                    </div>




          
       
     `;
		} else {
			brandCardData += `
            <div class="col-sm-12 col-md-12 col-lg-12">
				<div class="card">
					<div class="card-body">
					<div class="brands_image">
						<img
							src="${data.fields.photo.fields.file.url}"
							alt=""
						/>
						</div>
						<div class="card-text-outside px-3 px-lg-0 py-3">
							<p class="card-text">
							${data.fields.description}
							</p>
						</div>
						<a target="_blank" href="${"https://" + data.fields.linkTarget}" class="py-4">${data.fields.link
				}</a>
					</div>
				</div>
			</div>;
       
     `;
		}
	});

	document.getElementById("brands-section").innerHTML = brandCardData;

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
