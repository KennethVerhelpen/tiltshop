export const throttleApi = (time, request) => {
  return (
    new Promise(function(resolve, reject){
        setTimeout(() => {
          resolve(request);
        }, time)
    })
  );
};

export const getReadingTime = (texts: string[]) => {
  const wordsPerMinute = 200;
  let time = null;
  if (texts.length > 0) {
    let totalCount: number = 0;
    for(var i = 0; i < texts.length; i++) { 
      totalCount += texts[i].split(" ").length;
    } return time = Math.ceil(totalCount / wordsPerMinute);
  } return time
}

export const getFormatedDate = (date: string) => {
  let shortDate: string = null;
  if (date.length > 0) {
    shortDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date(date));
  } return shortDate;
}

export  const createMarkup = (html) => {
  return {__html: html};
}
