async function resformater(response) {
  const resSections = {
    short: [],
    descriptive: [],
    evocative: [],
    character: [],
  };

  const lines = response.split("\n");
  let currentSection = null;

 await lines.forEach((line) => {
    if (line.startsWith("**Short & Punchy:**")) currentSection = "short";
    else if (line.startsWith("**Descriptive:**"))
      currentSection = "descriptive";
    else if (line.startsWith("**Evocative/Thematic:**"))
      currentSection = "evocative";
    else if (line.startsWith("**Character-Focused:**"))
      currentSection = "character";

    if (currentSection && line.trim() && !line.startsWith("**")) {
      const cleanLine = line.replace(/^\*?\s+/, "").trim();
      if (cleanLine) resSections[currentSection].push(cleanLine);
    }
  });

  return resSections;
}

module.exports = resformater