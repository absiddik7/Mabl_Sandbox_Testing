document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addButton");
  const sheetNameInput = document.getElementById("sheetName");
  const valuesContainer = document.getElementById("valuesContainer");

  addButton.addEventListener("click", function () {
    if (
      sheetNameInput.style.display === "none" ||
      sheetNameInput.style.display === ""
    ) {
      sheetNameInput.style.display = "inline-block";
    } else {
      const sheetName = sheetNameInput.value;
      if (sheetName.trim() !== "") {
        const valueDiv = document.createElement("div");
        valueDiv.classList.add("green-capsule");

        // Add a space to separate text from the close icon
        const spaceDiv = document.createElement("div");
        spaceDiv.classList.add("space");

        valueDiv.appendChild(spaceDiv);
        valueDiv.innerHTML += sheetName;

        // Add a close icon to remove the value
        const removeIcon = document.createElement("span");
        removeIcon.innerHTML = "&#10006;";
        removeIcon.classList.add("remove-icon");
        removeIcon.addEventListener("click", function () {
          valuesContainer.removeChild(valueDiv);
        });

        valueDiv.appendChild(removeIcon);
        valuesContainer.appendChild(valueDiv);
        sheetNameInput.value = "";
      }
      sheetNameInput.style.display = "none";
    }
  });

  // Listen for the Enter key press to save the text
  sheetNameInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      addButton.click(); // Trigger the button click event
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scrapeButton = document.getElementById("scrapeButton");
  const h1Result = document.getElementById("h1Result");

  scrapeButton.addEventListener("click", () => {
    // Function to extract work experiences from a LinkedIn profile page
    function extractWorkExperiences() {
      const workExperiences = [];

      // Select all work experience items (you may need to adjust the selector)
      const experienceItems = document.querySelectorAll(".pvs-list__item");

      experienceItems.forEach((item) => {
        const companyName =
          item.querySelector(".hoverable-link-text.t-bold")?.innerText.trim() ||
          "";
        const jobTitle =
          item
            .querySelector(".t-14.t-normal.t-black--light")
            ?.innerText.trim() || "";
        const dateRange =
          item.querySelector(".t-14.t-normal")?.innerText.trim() || "";

        const workExperience = {
          companyName,
          jobTitle,
          dateRange,
        };

        workExperiences.push(workExperience);
        h1Result.textContent = workExperiences.length;
        workExperiences.forEach((experience) => {
          const text = `Company: ${experience.companyName}, Job Title: ${experience.jobTitle}, Date Range: ${experience.dateRange}`;
          h1Result.textContent = text;
        });
      });

      return workExperiences;
    }

    // Call the function to extract work experiences
    const extractedWorkExperiences = extractWorkExperiences();

    // Output the extracted data to the console
    console.log(extractedWorkExperiences);

    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   console.log("Tab ID:", tabs[0].id); // Log the tab ID
    //   chrome.tabs.sendMessage(
    //     tabs[0].id,
    //     { action: "scrapeH1" },
    //     function (response) {
    //       console.log("Response received:", response); // Log the response
    //       if (response && response.h1Text) {
    //         h1Result.textContent = response.h1Text;
    //       } else {
    //         h1Result.textContent = "No H1 tag found on this page.";
    //       }
    //     }
    //   );
    // });
  });
});
