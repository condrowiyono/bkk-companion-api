const safeParseResponse = async (response: Response) => {
  if (response.ok) {
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      throw new Error("Error parsing data");
    }
  }

  throw new Error("Error fetching data");
};

export default safeParseResponse;
