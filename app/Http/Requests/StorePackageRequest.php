<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePackageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'trackingNumber' => 'required|string|max:255',
            'carrierId' => 'required|integer|exists:carriers,id',
            'ownerId' => 'required|integer|exists:users,id',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'carrierId' => (int) $this->carrierId,
            'ownerId' => $this->user()->id,
        ]);
    }
}
