const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setIsSubmitting(true);

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      onSubmit();
    } else {
      alert("提交失敗，請稍後再試");
    }

  } catch (error) {
    alert("伺服器錯誤，請稍後再試");
  }

  setIsSubmitting(false);
};