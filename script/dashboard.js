const createElement = (arr) => {
    return arr.map((el) => {
        const label = el.toLowerCase();
        let colorClass = '';
        let icon = '';
        if (label === 'bug') {
            icon = '<i class="fa-solid fa-bug"></i>'
            colorClass = 'btn-error';
        } else if (label === 'enhancement') {
            icon = '<i class="fa-solid fa-wand-magic-sparkles"></i>'
            colorClass = 'btn-success';
        } else if (label === 'help wanted') {
            icon = '<i class="fa-solid fa-life-ring"></i>'
            colorClass = 'btn-warning';
        } else {
            colorClass = 'btn-accent';
            icon = '<i class="fa-solid fa-thumbs-up"></i>';
        }

        return `<span class="px-3 py-1 rounded-full text-[12px] btn btn-soft font-bold uppercase ${colorClass}">${icon} ${el}</span>`;
    }).join(' ');
}

const issueCont = document.getElementById('issueCont');

// For load issue
async function loadIssue() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const issues = await res.json();
    // console.log(data); 
    displayIssue(issues.data);
}

// For display issue by append in DOM
const displayIssue = (trees) => {
    issueCont.innerHTML = "";
    // console.log(trees);
    trees.forEach(tree => {
        // console.log(tree);
        const priority = tree.priority.toLowerCase();
        let btnColor = '';
        let topBorderColor = '';

        if (priority === 'high') {
            btnColor = 'btn-error';
        } else if (priority === 'medium') {
            btnColor = 'btn-warning';
        } else {
            btnColor = 'btn-soft';
        }

        // adding border color by status
        const status = tree.status.toLowerCase();
        if (status == 'open') {
            topBorderColor = 'border-t-green-600';
        }
        else {
            topBorderColor = 'border-t-purple-600';
        }
        // setting time right
        const createdAt = new Date(tree.createdAt).toLocaleDateString();
        const updatedAt = new Date(tree.updatedAt).toLocaleDateString();
        // setting inner html
        const issueContainer = document.createElement('div');
        issueContainer.className = '';
        issueContainer.innerHTML = `
        <div onclick="loadModal(${tree.id})">
                <div class="p-4 border rounded-xl border-b-gray-200 h-[27rem] grid grid-rows-[auto_1fr_auto] border-l-gray-200 border-r-gray-200 border-t-4 ${topBorderColor} shadow-sm">
                    <div class="mb-1 rounded-lg p-4">
                        <div class="flex justify-between items-center mb-4">
                           <img src="${tree.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}">
                            <button id="btn-priority" class="btn btn-soft ${btnColor} rounded-full">${tree.priority.toUpperCase()}</button>
                        </div>
                        <div class="mb-3">
                            <h1 class="font-semibold text-xl text-[#1F2937] mb-2">${tree.title}</h1>
                            <p class="text-[#64748B]">${tree.description}</p>
                        </div>
                        <div id="issueLabel" class="flex max-sm:flex-wrap gap-2 max-sm:space-y-2 items-center mb-4">${createElement(tree.labels)}</div>
                    </div>
                    <hr/ class=" bg-gray-200 border-gray-200">
                    <div class="rounded-lg space-y-4 p-4">
                        <div class="flex justify-between">
                            <p class="text-[#64748B] text-sm">#${tree.id} ${tree.author}</p>
                            <p class="text-[#64748B] text-sm">${createdAt}</p>
                            </div>
                            <div class="flex justify-between">
                            <p class="text-[#64748B] text-sm">Assignee: ${tree.assignee}</p>
                            <p class="text-[#64748B] text-sm">Updated At: ${updatedAt}</p>
                        </div>
                    </div>
                </div>
        </div>
                `;
        issueCont.appendChild(issueContainer);

        // issue count
        const issuesCount = document.getElementById('issues_count');
        if (issuesCount) {
            issuesCount.innerText = trees.length;
        }
    });
}

loadIssue();

// toggleing button and ading color
const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closedBtn = document.getElementById('close-btn');
allBtn.classList.add('btn-primary');
const toggleButton = (id) => {
    console.log(id);
    if (id === 'all-btn') {
        toggleSpinner(true);
        allBtn.classList.add('btn-primary');
        openBtn.classList.remove('btn-primary');
        closedBtn.classList.remove('btn-primary');
    }
    else if (id === 'open-btn') {
        toggleSpinner(true);
        openBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        closedBtn.classList.remove('btn-primary');
    }
    else if (id === 'close-btn') {
        toggleSpinner(true);
        closedBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        openBtn.classList.remove('btn-primary');
    }

}

// filtering data
const allcards = () => {
    showSpinner(true)//lodding
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => cardsection(data.data))
}

const allIssueCards = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then((res) => res.json())
        .then((data) => {
            const allIssues = data.data;
            displayIssue(allIssues);
            toggleSpinner(false);
        });
}

const openIssueCard = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then((res) => res.json())
        .then((data) => {
            const openIssues = data.data.filter(singleData => singleData.status === "open");
            // console.log(openIssues);
            displayIssue(openIssues);
            toggleSpinner(false);
        })
}
const closeIssueCard = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then((res) => res.json())
        .then((data) => {
            const closedIssues = data.data.filter(singleData => singleData.status === "closed");
            // console.log(closedIssues);
            displayIssue(closedIssues);
            toggleSpinner(false);
        })
}


const loadModal = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(details => {
            displayModal(details.data);
        })
};

const displayModal = (modals) => {
    const createdAt = new Date(modals.createdAt).toLocaleDateString();
    document.getElementById('modal_box').showModal();
    console.log(modals);
    const modalBox = document.getElementById('modalDetails');
    const priority = modals.priority;
    let priorityClass = "";
    if (priority === "High") {
        priorityClass = "bg-red-500 text-white border-none";
    }
    modalBox.innerHTML = `
    
     <h3 class="text-2xl text-[#1F2937] mb-4 font-bold">
        ${modals.title}
     </h3>
    <div class="flex space-x-4 items-center mb-6">
        <button id="modal_details_btn" class="btn px-3 rounded-full py-[6px]">${modals.status.toUpperCase()}</button>
        <i class="fa-solid fa-circle text-xs text-[#64748B]"></i>
        <p class="text-[#64748B]">Opene by ${modals.author}</p>
        <i class="fa-solid fa-circle text-xs text-[#64748B]"></i>
        <p class="text-[#64748B]">${createdAt}</p>
       
    </div>
    <div class="space-y-6">

        <div id="issueLabel" class="flex max-sm:flex-wrap gap-2 max-sm:space-y-2 items-center mb-4">${createElement(modals.labels)}</div>

        <p class="text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.</p>
        <div>

        <div class="flex">
            <div class="flex-1">
                <p class="text-[#64748B] mb-2">Assignee:</p>
                <h1 class="font-semibold text-[#1F2937]">${modals.assignee}</h1>
            </div>
            <div class="flex-1">
                <p class="text-[#64748B] mb-2">Priority:</p>
                <span class="btn btn-sm ${priorityClass} pointer-events-none uppercase">${priority}</span>
            </div>
        </div>
    `;
}

const searchField = document.getElementById("search");
searchField.addEventListener("input", function (event) {
    const query = event.target.value.toLowerCase().trim();
    const issueContainer = document.getElementById("issueCont");
    const allCards = issueContainer.children;
    for (let i = 0; i < allCards.length; i++) {
        const card = allCards[i];
        const title = card.querySelector("h1, h2, h3")?.innerText.toLowerCase() || "";
        const description = card.querySelector("p")?.innerText.toLowerCase() || "";
        if (title.includes(query) || description.includes(query)) {
            card.classList.remove("hidden");
            card.classList.add("block");
        } else {
            card.classList.add("hidden");
            card.classList.remove("block");
        }
    }
});
const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById('loading-spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
        issueCont.innerHTML = "";
    } else {
        spinner.classList.add('hidden');
    }
}