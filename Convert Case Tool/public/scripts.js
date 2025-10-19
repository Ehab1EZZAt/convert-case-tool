function convertCase(type) {
      const text = document.getElementById("inputText").value;
      let result = "";

      switch (type) {
        case "upper":
          result = text.toUpperCase();
          break;
        case "lower":
          result = text.toLowerCase();
          break;
        case "title":
          result = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
          break;
        case "sentence":
          result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
          break;
        case "camel":
          result = toCamelCase(text);
          break;
        case "snake":
          result = toSnakeCase(text);
          break;
        case "kebab":
          result = toKebabCase(text);
          break;
        default:
          result = text;
      }

      const output = document.getElementById("output");
      output.style.opacity = 0;
      setTimeout(() => {
        output.textContent = result;
        output.style.opacity = 1;
        updateCounts(result);
      }, 200);
    }

    function toCamelCase(text) {
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]+/g, '')
        .split(' ')
        .map((word, index) => {
          if (index === 0) return word;
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
    }

    function toSnakeCase(text) {
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]+/g, '')
        .trim()
        .replace(/\s+/g, '_');
    }

    function toKebabCase(text) {
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]+/g, '')
        .trim()
        .replace(/\s+/g, '-');
    }

    function updateCounts(text) {
      const charCount = text.length;
      const words = text.trim().split(/\s+/).filter(Boolean);
      const wordCount = words.length;
      document.getElementById('charCount').textContent = charCount;
      document.getElementById('wordCount').textContent = wordCount;
    }

    function copyText() {
      const output = document.getElementById("output").textContent;
      if (!output.trim()) return;
      navigator.clipboard.writeText(output).then(() => {
        const msg = document.getElementById("copiedMsg");
        msg.style.display = "inline";
        setTimeout(() => {
          msg.style.display = "none";
        }, 2000);
      });
    }

    function downloadTxt() {
      const text = document.getElementById("output").textContent;
      if (!text.trim()) return;
      const blob = new Blob([text], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "converted-text.txt";
      link.click();
    }

    document.getElementById("inputText").addEventListener("input", (e) => {
      updateCounts(e.target.value);
    });

    window.addEventListener("load", () => {
      updateCounts(document.getElementById("inputText").value);
    });