console.log('yep')

const getApi = () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.data);
        })
        .catch((e) => console.log(e));
}
getApi();
// Adding api data in container
const issueCard = document.getElementById('issue_card');
issueCard.innerHTML = `
    <div class="p-4 border rounded-xl border-b-gray-200 border-l-gray-200 border-r-gray-200 border-t-green-600 border-t-4">
                    <div class="border mb-1 rounded-lg border-gray-200 p-4">
                        <div class="flex justify-between items-center">
                            <img src="./assets/Open-Status.png" alt="openStatus">
                            <button class="btn btn-soft btn-error rounded-full">HELP</button>
                        </div>
                        <div class="mb-6">
                            <h1 class="font-semibold text-xl text-[#1F2937] mb-2">Fix navigation menu on mobile devices</h1>
                            <p class="text-[#64748B]">The navigation menu doesn't collapse properly on mobile
                                devices...</p>
                        </div>
                        <div class="flex gap-2 items-center mb-4">
                            <button class="btn btn-error btn-soft rounded-full">
                                <i class="fa-solid fa-bug"></i>
                                BUG
                            </button>
                            <button class="btn btn-warning btn-soft rounded-full">
                                <i class="fa-solid fa-life-ring"></i>
                                HELP WANTED
                            </button>
                        </div>
                    </div>
                    <div class="border rounded-lg border-gray-200 space-y-4 p-4">
                        <p class="text-[#64748B] text-sm">#1 by john_doe</p>
                        <p class="text-[#64748B] text-sm">1/15/2024</p>
                    </div>
                </div>
`;