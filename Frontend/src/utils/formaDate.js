const formatDate = (date) => {
    let newdate = new Date(date);
    newdate = newdate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    return newdate;
};

export { formatDate };
