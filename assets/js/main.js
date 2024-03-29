class DBFlix {
  data = [];
  __create_object(name, url_image, trailer) {
    // PSEUDO PRIVATE FUNCTION
    const obj = {
      id: this.data.length + 1, // TAMAÑO TOTAL + 1
      name: name,
      url_image: url_image,
      trailer: trailer,
    };
    return obj;
  }
  save(name, url, trailer) {
    // GUARDA OBJETO EN ARREGLO DE DATOS
    this.data.push(this.__create_object(name, url, trailer));
  }
  show_by_id(id) {
    // MUESTRA POR EL PARAMETRO ID
    if (id) {
      return this.data[id - 1] ? this.data[id - 1] : `Id ${id} no encontrado`;
    } else {
      return "Error se requiere un ID!";
    }
  }
  show_all() {
    // LISTA TODOS
    console.table(this.data);
  }
}

class AnimeFlix extends DBFlix {
  save(name, url, trailer) {
    // previo a generar el objeto anime valida si es permitido en la url
    if (this.__validation_image(url)) {
      this.data.push(super.__create_object(name, url, trailer));
    } else {
      return "Formato de imagen no valido, para: " + name + " " + url;
    }
  }
  __validation_image(url) {
    // valida formatos de imagen en url
    const valid_formats = ["jpg", "jpeg", "png"];
    const array_url_image = url.split(".");
    const image_ext = array_url_image[array_url_image.length - 1];
    return valid_formats.includes(image_ext);
  }

  create_card(content) {
    this.data.forEach(ele => {
      // se crean los elementos
      const card = document.createElement("article")
      const image_card = document.createElement("div")
      const image = document.createElement("img")
      const title_card = document.createElement("div")
      const title = document.createElement("p")
      const actions = document.createElement("div")
      const remove = document.createElement("button")
      // se agregan los atributos 
      card.setAttribute('class', 'card')
      image_card.setAttribute('class', 'card--image')
     
      title_card.setAttribute('class', ' card--title')
      actions.setAttribute('class', 'actions')
      remove.setAttribute('class', 'btn remove')
      remove.setAttribute('data_id', ele.id)
      image.setAttribute('title', ele.name)
      // se agrega la data
      image.src = ele.url_image
      title.innerHTML = ele.name
      remove.innerHTML = `<i class="fa-solid fa-trash"></i> Eliminar`
      // se anidan los hijos a los contenedores padre
      image_card.appendChild(image)
      title_card.appendChild(title)
      actions.appendChild(remove)
      // los contenedores padre se anidan al contenedor base
      card.appendChild(image_card)
      card.appendChild(title_card)
      card.appendChild(actions)
      
      image.onclick = () => {
        window.open(ele.trailer, '_blank');
      }
      // se anida el contenedor (card) al contedido en DOM
      content.appendChild(card)

    })
  }
}
