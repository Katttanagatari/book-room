function useDate() {
  const minDate = new Date();

  const maxDate = new Date(minDate);
  maxDate.setDate(minDate.getDate() + 30);

  return {
    minDate,
    maxDate,
  };
}

export default useDate;
