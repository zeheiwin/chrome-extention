
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {

        if (document.body.contains(document.getElementById('app_time'))) {

            console.log(document.getElementById('app_time').value);
            console.log('\n\n');

            chrome.storage.sync.get(['firstName', 'lastName', 'birth', 'passNumber', 'issueDate', 'expiryDate', 'issuePlace'], function (storage) {
                
                console.log(storage);
                
                location.href = `javascript:document.getElementById('first_name').value = '${storage.firstName}';
                document.getElementById('last_name').value =' ${storage.lastName}';
                document.getElementById('passport_no').value = '${storage.passNumber}';
                $('#dateOfBirth').datepicker("update", '${storage.birth}');
                $('#pptIssueDate').datepicker("update", '${storage.issueDate}');
                $('#pptExpiryDate').datepicker("update", '${storage.expiryDate}');
                document.getElementById('pptIssuePalace').value = '${storage.issuePlace}';
                document.getElementById('VisaTypeId').selectedIndex = 1;
                var indexMax = document.getElementById('app_time').length - 1;
                var ei = Math.floor((Math.random() * indexMax) + 0);
                document.getElementById('app_time').selectedIndex = ei;
                $('#terms').prop('checked', true);

                document.getElementById('applicantBooking2').onsubmit = "";

                setTimeout(() => {
                    document.getElementById('applicantBooking2').submit();
                }, 12000);
                `
            });

        } else {

            var data = document.getElementsByTagName('script')[12].innerText;
            var re = /var available_dates = \[(.*?)\];/g;
            var result = re.exec(data);
            eval(result[0]);
            console.log(available_dates);
            document.getElementById('app_date').value = formatDate(available_dates[available_dates.length - 1]);

        }
    }
};


function formatDate(rawDate) {
    var arry = rawDate.split("-");
    return arry[2] + "-" + arry[1] + "-" + arry[0];
}	