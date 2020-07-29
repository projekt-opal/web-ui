export function getTitle(dataSet, language) {
  let title = null;

  if(language == "Deutsch") {
    title = dataSet.title_de ? dataSet.title_de : null;
  }

  if(title == null) {
    title = dataSet.title ? dataSet.title : "";
  }

  if(title.substr(0,1) == '"'){
      if(title.substr(1).includes('"')){
        title = title.substr(1, title.substr(1).lastIndexOf('"'));
      }
  }

  return title;
}

export function getDescription(dataSet, language) {
  let description = null;

  if(language == "Deutsch") {
    description = dataSet.description_de ? dataSet.description_de : null;
  }

  if(description == null) {
    description = dataSet.description ? dataSet.description : "";
  }

  if(description.substr(0,1) == '"'){
      if(description.substr(1).includes('"')){
        description = description.substr(1, description.substr(1).lastIndexOf('"'));
      }
  }

  return description;
}
