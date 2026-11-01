(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var success = document.getElementById('form-success');
  var button = form.querySelector('[type="submit"]');
  var sending = false;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    var endpoint = form.dataset.endpoint;
    if (!endpoint) {
      status.textContent = 'Online enquiries are temporarily unavailable. Please call (703) 606-8033.';
      return;
    }
    sending = true;
    button.disabled = true;
    status.textContent = 'Sending your message…';
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 15000);
    try {
      var response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
        signal: controller.signal
      });
      if (!response.ok) throw new Error('Submission failed');
      var result = await response.json();
      if (result.success !== true) throw new Error('Submission not confirmed');
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      status.textContent = 'We could not confirm your message was sent. Your details are still here. Please try again or call (703) 606-8033.';
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
    }
  });
})();
