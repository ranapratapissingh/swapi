var requestCompletePeople = true;
var requestCompletePlanets = true;
var requestCompleteSpecies = true;
var requestCompleteVehicles = true;
var requestCompleteStarships = true;
var nextPageURL = null;
var films = null;
var species = null;
var vehicles = null;
var starships = null;
var peoples = null;

function ajaxRequest_homepage(url, reqType, data, callType){

    $.ajax({
        url: url,
        type: reqType,
        data: data,            
        beforeSend: function(){ 
            if (callType == 'people') {
                requestCompletePeople = false;
            } else if (callType == 'planets') {
                requestCompletePlanets = false;
            } else if (callType == 'species') {
                requestCompleteSpecies = false;
            }
            else if (callType == 'vehicles') {
                requestCompleteVehicles = false;
            }
            else if (callType == 'starships') {
                requestCompleteStarships = false;
            }
            document.getElementById('storyCategoryCard').style.display = 'block';
        },
        success: function(response) { 
            if (callType == 'people') {
                if (response.results != undefined) {
                    if (response.results.length > 0) {
                        for (var i = 0; i < response.results.length; i++) {
                            var html = `<div class="col s12 storyPage-card storyCategoryCard">
                                <div class="storyPage-cardImage storyCategoryCard-img">
                                    <a onclick="show_main_loader()" href="" style="background-image: url(${PHOTOS});border-bottom:none;"></a>
                                </div>
                                <div class="col s12 storyPage-title storyCategoryCard-caption">
                                    <h4><a onclick="show_main_loader()" href="${BASE_URL+'people/'+response.results[i].url.split('/')[5]+'/'}">${response.results[i].name}</a></h4>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Gender</p>
                                        <p style="color:#000!important;"> ${response.results[i].gender} </p>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('category_story_cards').innerHTML +=html;
                        }
                    }
                    requestCompletePeople = true;
                    nextPageURL = response.next;
                }else{

                    films = (response.films.length>0) ? response.films[0] : 'N/A';
                    species = (response.species.length>0) ? response.species[0] : 'N/A';
                    vehicles = (response.vehicles.length>0) ? response.vehicles[0] : 'N/A';
                    starships = (response.starships.length>0) ? response.starships[0] : 'N/A';

                     var html = `<div class="col s12 storyPage-card storyCategoryCard">
                                <div class="col s12 storyPage-title storyCategoryCard-caption">
                                    <h4>${response.name}</h4>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Hair Color</p>
                                        <p style="color:#000!important;">${response.hair_color}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Skin Color</p>
                                        <p style="color:#000!important;">${response.skin_color}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Eye Color</p>
                                        <p style="color:#000!important;">${response.eye_color}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Birth Year</p>
                                        <p style="color:#000!important;">${response.birth_year}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Gender</p>
                                        <p style="color:#000!important;">${response.gender}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Height</p>
                                        <p style="color:#000!important;">${response.height}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Mass</p>
                                        <p style="color:#000!important;">${response.mass}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>films</p>
                                        <a href="${BASE_URL+'films/'+films.split('/')[5]+'/'}"><p style="color:#000!important;">${films}</p></a>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Species</p>
                                        <a href="${BASE_URL+'species/'+species.split('/')[5]+'/'}"><p style="color:#000!important;">${species}</p></a>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Vehicles</p>
                                        <a href="${BASE_URL+'vehicles/'+vehicles.split('/')[5]+'/'}"><p style="color:#000!important;">${vehicles}</p></a>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Starships</p>
                                        <a href="${BASE_URL+'starships/'+starships.split('/')[5]+'/'}"><p style="color:#000!important;">${starships}</p></a>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('category_story_cards').innerHTML +=html;
                }
                document.getElementById('storyCategoryCard').style.display = 'none';
               
            }
            if (callType == 'planets') {
               if (response.results != undefined) {
                    if (response.results.length > 0) {
                        for (var i = 0; i < response.results.length; i++) {
                            var html = `<div class="col s12 storyPage-card storyCategoryCard">
                                <div class="storyPage-cardImage storyCategoryCard-img">
                                    <a onclick="show_main_loader()" href="" style="background-image: url(${PHOTOS});border-bottom:none;"></a>
                                </div>
                                <div class="col s12 storyPage-title storyCategoryCard-caption">
                                    <h4><a onclick="show_main_loader()" href="${BASE_URL+'planets/'+response.results[i].url.split('/')[5]+'/'}">${response.results[i].name}</a></h4>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Diameter</p>
                                        <p style="color:#000!important;">${response.results[i].diameter}</p>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('category_story_cards').innerHTML +=html;
                        }
                    }
                    requestCompletePlanets = true;
                    nextPageURL = response.next;
                }else{

                    films = (response.films.length>0) ? response.films[0] : 'N/A';

                     var html = `<div class="col s12 storyPage-card storyCategoryCard">
                                <div class="col s12 storyPage-title storyCategoryCard-caption">
                                    <h4>${response.name}</h4>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Climate</p>
                                        <p style="color:#000!important;">${response.climate}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Gravity</p>
                                        <p style="color:#000!important;">${response.gravity}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Population</p>
                                        <p style="color:#000!important;">${response.population}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Rotation Period</p>
                                        <p style="color:#000!important;">${response.rotation_period}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Surface Water</p>
                                        <p style="color:#000!important;">${response.surface_water}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Terrain</p>
                                        <p style="color:#000!important;">${response.terrain}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Orbital Period</p>
                                        <p style="color:#000!important;">${response.orbital_period}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>films</p>
                                        <a href="${BASE_URL+'films/'+films.split('/')[5]+'/'}"><p style="color:#000!important;">${films}</p></a>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('category_story_cards').innerHTML +=html;
                }
                document.getElementById('storyCategoryCard').style.display = 'none';
               
            }
            if (callType == 'films') {

                if (response.results != undefined) {
                    if (response.results.length > 0) {
                        for (var i = 0; i < response.results.length; i++) {
                            var html = `<div class="col s12 storyPage-card storyCategoryCard">
                                <div class="storyPage-cardImage storyCategoryCard-img">
                                    <a onclick="show_main_loader()" href="" style="background-image: url(${PHOTOS});border-bottom:none;"></a>
                                </div>
                                '<div class="col s12 storyPage-title storyCategoryCard-caption">
                                    <h4><a onclick="show_main_loader()" href="${BASE_URL+'films/'+response.results[i].url.split('/')[5]+'/'}">${response.results[i].title}</a></h4>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Episode</p>
                                        <p style="color:#000!important;">${response.results[i].episode_id}</p>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('category_story_cards').innerHTML +=html;
                        }
                    }
                   
                }else{

                    species = (response.species.length>0) ? response.species[0] : 'N/A';
                    vehicles = (response.vehicles.length>0) ? response.vehicles[0] : 'N/A';
                    starships = (response.starships.length>0) ? response.starships[0] : 'N/A';

                     var html = `<div class="col s12 storyPage-card storyCategoryCard">
                                <div class="col s12 storyPage-title storyCategoryCard-caption">
                                    <h4>${response.title}</h4>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Episode Id</p>
                                        <p style="color:#000!important;">${response.episode_id}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Opening Crawl</p>
                                        <p style="color:#000!important;">${response.opening_crawl}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Director</p>
                                        <p style="color:#000!important;">${response.director}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Producer</p>
                                        <p style="color:#000!important;">${response.producer}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Release Date</p>
                                        <p style="color:#000!important;">${response.release_date}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Characters</p>
                                        <a href="${BASE_URL+'people/'+response.characters[0].split('/')[5]+'/'}"><p style="color:#000!important;">${response.characters[0]}</p></a>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Planets</p>
                                        <a href="${BASE_URL+'planets/'+response.planets[0].split('/')[5]+'/'}"><p style="color:#000!important;">${response.planets[0]}</p></a>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Species</p>
                                        <a href="${BASE_URL+'species/'+species.split('/')[5]+'/'}"><p style="color:#000!important;">${species}</p></a>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Vehicles</p>
                                        <a href="${BASE_URL+'vehicles/'+vehicles.split('/')[5]+'/'}"><p style="color:#000!important;">${vehicles}</p></a>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Starships</p>
                                        <a href="${BASE_URL+'starships/'+starships.split('/')[5]+'/'}"><p style="color:#000!important;">${starships}</p></a>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('category_story_cards').innerHTML +=html;
                }
                document.getElementById('storyCategoryCard').style.display = 'none';
                
            }
            if (callType == 'species') {

                if (response.results != undefined) {
                    if (response.results.length > 0) {
                        for (var i = 0; i < response.results.length; i++) {
                            var html = `<div class="col s12 storyPage-card storyCategoryCard">
                                <div class="storyPage-cardImage storyCategoryCard-img">
                                    <a onclick="show_main_loader()" href="" style="background-image: url(${PHOTOS});border-bottom:none;"></a>
                                </div>
                                <div class="col s12 storyPage-title storyCategoryCard-caption">
                                    <h4><a onclick="show_main_loader()" href="${BASE_URL+'species/'+response.results[i].url.split('/')[5]+'/'}">${response.results[i].name}</a></h4>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Classification</p>
                                        <p style="color:#000!important;">${response.results[i].classification}</p>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('category_story_cards').innerHTML +=html;
                        }
                    }
                    requestCompleteSpecies = true;
                    nextPageURL = response.next;
                }else{

                    films = (response.films.length>0) ? response.films[0] : 'N/A';
                    people = (response.people.length>0) ? response.people[0] : 'N/A';

                     var html = `<div class="col s12 storyPage-card storyCategoryCard">
                                <div class="col s12 storyPage-title storyCategoryCard-caption">
                                    <h4>${response.name}</h4>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Classification</p>
                                        <p style="color:#000!important;">${response.classification}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Designation</p>
                                        <p style="color:#000!important;">${response.designation}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Average Height</p>
                                        <p style="color:#000!important;">${response.average_height}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Skin Colors</p>
                                        <p style="color:#000!important;">${response.skin_colors}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Hair Colors</p>
                                        <p style="color:#000!important;">${response.hair_colors}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Eye Colors</p>
                                        <p style="color:#000!important;">${response.eye_colors}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Average Lifespan</p>
                                        <p style="color:#000!important;">${response.average_lifespan}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Language</p>
                                        <p style="color:#000!important;">${response.language}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Films</p>
                                        <a href="${BASE_URL+'films/'+films.split('/')[5]+'/'}"><p style="color:#000!important;">${films}</p></a>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>People</p>
                                        <a href="${BASE_URL+'people/'+people.split('/')[5]+'/'}"><p style="color:#000!important;">${people}</p></a>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('category_story_cards').innerHTML +=html;
                }
                document.getElementById('storyCategoryCard').style.display = 'none';
               
            }
            if (callType == 'vehicles') {

                if (response.results != undefined) {
                    if (response.results.length > 0) {
                        for (var i = 0; i < response.results.length; i++) {
                            var html = `<div class="col s12 storyPage-card storyCategoryCard">
                                <div class="storyPage-cardImage storyCategoryCard-img">
                                    <a onclick="show_main_loader()" href="" style="background-image: url(${PHOTOS});border-bottom:none;"></a>
                                </div>
                                <div class="col s12 storyPage-title storyCategoryCard-caption">
                                    <h4><a onclick="show_main_loader()" href="${BASE_URL+'vehicles/'+response.results[i].url.split('/')[5]+'/'}">${response.results[i].name}</a></h4>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Model</p>
                                        <p style="color:#000!important;">${response.results[i].model}</p>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('category_story_cards').innerHTML +=html;
                        }
                    }
                    requestCompleteVehicles = true;
                    nextPageURL = response.next;
                }else{
                    films = (response.films.length>0) ? response.films[0] : 'N/A';

                     var html = `<div class="col s12 storyPage-card storyCategoryCard">
                                <div class="col s12 storyPage-title storyCategoryCard-caption">
                                    <h4>${response.name}</h4>
                                    '<div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Classification</p>
                                        <p style="color:#000!important;">${response.model}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Designation</p>
                                        <p style="color:#000!important;">${response.manufacturer}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Average Height</p>
                                        <p style="color:#000!important;">${response.passengers}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Skin Colors</p>
                                        <p style="color:#000!important;">${response.length}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Hair Colors</p>
                                        <p style="color:#000!important;">${response.crew}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Eye Colors</p>
                                        <p style="color:#000!important;">${response.cost_in_credits}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Average Lifespan</p>
                                        <p style="color:#000!important;">${response.consumables}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Language</p>
                                        <p style="color:#000!important;">${response.cargo_capacity}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Films</p>
                                        <a href="${BASE_URL+'films/'+films.split('/')[5]+'/'}"><p style="color:#000!important;">${films}</p></a>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('category_story_cards').innerHTML +=html;
                }
                document.getElementById('storyCategoryCard').style.display = 'none';
               
            }
            if (callType == 'starships') {

                if (response.results != undefined) {
                    if (response.results.length > 0) {
                        for (var i = 0; i < response.results.length; i++) {
                            var html = `<div class="col s12 storyPage-card storyCategoryCard">
                                <div class="storyPage-cardImage storyCategoryCard-img">
                                    <a onclick="show_main_loader()" href="" style="background-image: url(${PHOTOS});border-bottom:none;"></a>
                                </div>
                                <div class="col s12 storyPage-title storyCategoryCard-caption">
                                    <h4><a onclick="show_main_loader()" href="${BASE_URL+'starships/'+response.results[i].url.split('/')[5]+'/'}">${response.results[i].name}</a></h4>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Model</p>
                                        <p style="color:#000!important;">${response.results[i].model}</p>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('category_story_cards').innerHTML +=html;
                        }
                    }
                    requestCompleteStarships = true;
                    nextPageURL = response.next;
                }else{
                    films = (response.films.length>0) ? response.films[0] : 'N/A';

                     var html = `<div class="col s12 storyPage-card storyCategoryCard">
                                <div class="col s12 storyPage-title storyCategoryCard-caption">
                                    <h4>${response.name}</h4>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Classification</p>
                                        <p style="color:#000!important;">${response.model}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Designation</p>
                                        <p style="color:#000!important;">${response.manufacturer}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Average Height</p>
                                        <p style="color:#000!important;">${response.passengers}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Skin Colors</p>
                                        <p style="color:#000!important;">${response.length}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Hair Colors</p>
                                        <p style="color:#000!important;">${response.crew}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Eye Colors</p>
                                        <p style="color:#000!important;">${response.cost_in_credits}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Average Lifespan</p>
                                        <p style="color:#000!important;">${response.consumables}</p>
                                    </div>
                                    <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Language</p>
                                        <p style="color:#000!important;">${response.cargo_capacity}</p>
                                    </div>
                                     <div class="col s12 storyPage-storyWriter storyCategoryCard-storyWriter">
                                        <p>Films</p>
                                        <a href="${BASE_URL+'films/'+films.split('/')[5]+'/'}"><p style="color:#000!important;">${films}</p></a>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('category_story_cards').innerHTML +=html;
                }
                document.getElementById('storyCategoryCard').style.display = 'none';
              
            }
            
        }, 
        error: function(error) {
            displayLoader('homeLoader', 'hide');
        }
    });
}

if (DETAIL_VIEW!=false) {

    if (PAGE_NAME == 'PEOPLE') {
        ajaxRequest_homepage('https://swapi.co/api/people/'+PEOPLE_PAGE_VALUE+'/', 'GET', {}, 'people');
    }
    if (PAGE_NAME == 'PLANETS') {
        ajaxRequest_homepage('https://swapi.co/api/planets/'+PEOPLE_PAGE_VALUE+'/', 'GET', {}, 'planets');
    }
    if (PAGE_NAME == 'FILMS') {
        ajaxRequest_homepage('https://swapi.co/api/films/'+PEOPLE_PAGE_VALUE+'/', 'GET', {}, 'films');
    }
    if (PAGE_NAME == 'SPECIES') {
        ajaxRequest_homepage('https://swapi.co/api/species/'+PEOPLE_PAGE_VALUE+'/', 'GET', {}, 'species');
    }
    if (PAGE_NAME == 'VEHICLES') {
        ajaxRequest_homepage('https://swapi.co/api/vehicles/'+PEOPLE_PAGE_VALUE+'/', 'GET', {}, 'vehicles');
    }
    if (PAGE_NAME == 'STARSHIPS') {
        ajaxRequest_homepage('https://swapi.co/api/starships/'+PEOPLE_PAGE_VALUE+'/', 'GET', {}, 'starships');
    }
}else{
    if (PAGE_NAME == 'PEOPLE') {
        ajaxRequest_homepage('https://swapi.co/api/people/', 'GET', {}, 'people');
    }
    if (PAGE_NAME == 'PLANETS') {
        ajaxRequest_homepage('https://swapi.co/api/planets/', 'GET', {}, 'planets');
    }
    if (PAGE_NAME == 'FILMS') {
        ajaxRequest_homepage('https://swapi.co/api/films/', 'GET', {}, 'films');
    }
    if (PAGE_NAME == 'SPECIES') {
        ajaxRequest_homepage('https://swapi.co/api/species/', 'GET', {}, 'species');
    }
    if (PAGE_NAME == 'VEHICLES') {
        ajaxRequest_homepage('https://swapi.co/api/vehicles/', 'GET', {}, 'vehicles');
    }
    if (PAGE_NAME == 'STARSHIPS') {
        ajaxRequest_homepage('https://swapi.co/api/starships/', 'GET', {}, 'starships');
    }
}

if (typeof PAGE_NAME != 'undefined' && PAGE_NAME!='' && DETAIL_VIEW != true) {
    $(window).scroll(function () {
        if (PAGE_NAME == 'PEOPLE') {
            if (requestCompletePeople) {
                if ($(window).scrollTop() + $(window).height() + 100 >= $('#category_story_cards').offset().top + $('#category_story_cards').height() ) { 
                    requestCompletePeople = false;
                    ajaxRequest_homepage(nextPageURL, 'GET', {}, 'people');
                }
            }
        }
        if (PAGE_NAME == 'PLANETS') {
            if (requestCompletePlanets) {
                if ($(window).scrollTop() + $(window).height() + 100 >= $('#category_story_cards').offset().top + $('#category_story_cards').height() ) { 
                    requestCompletePlanets = false;
                    ajaxRequest_homepage(nextPageURL, 'GET', {}, 'planets');
                }
            }
        }
        if (PAGE_NAME == 'SPECIES') {
            if (requestCompleteSpecies) {
                if ($(window).scrollTop() + $(window).height() + 100 >= $('#category_story_cards').offset().top + $('#category_story_cards').height() ) { 
                    requestCompleteSpecies = false;
                    ajaxRequest_homepage(nextPageURL, 'GET', {}, 'species');
                }
            }
        }
        if (PAGE_NAME == 'VEHICLES') {
            if (requestCompleteVehicles) {
                if ($(window).scrollTop() + $(window).height() + 100 >= $('#category_story_cards').offset().top + $('#category_story_cards').height() ) { 
                    requestCompleteVehicles = false;
                    ajaxRequest_homepage(nextPageURL, 'GET', {}, 'vehicles');
                }
            }
        }
        if (PAGE_NAME == 'STARSHIPS') {
            if (requestCompleteStarships) {
                if ($(window).scrollTop() + $(window).height() + 100 >= $('#category_story_cards').offset().top + $('#category_story_cards').height() ) { 
                    requestCompleteStarships = false;
                    ajaxRequest_homepage(nextPageURL, 'GET', {}, 'starships');
                }
            }
        }
    });
}
