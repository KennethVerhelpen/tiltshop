export const throttleApi = (time, request) => {
  return (
    new Promise(function(resolve, reject){
        setTimeout(() => {
          resolve(request);
        }, time)
    })
  );
};

export const getReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  let time: number = null;
  if (text.length > 0) {
    const wordsCount = text.split(" ").length;
    const time = Math.ceil(wordsCount / wordsPerMinute)
    return time  
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

