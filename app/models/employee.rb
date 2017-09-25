class Employee < ApplicationRecord
    enum status: [:active, :inactive, :pending, :archived]
    enum role: [:admin, :employee]

    belongs_to :office
    has_many :employee_dietaries
    has_many :dietaries, through: :employee_dietaries

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :office, presence: true
    validates_email_format_of :email, :message => 'is not looking good'
    validates :email, uniqueness: {scope: :email}
    validates :phone, presence: true
    validates :status, presence: true
    validates :position, presence: true
    validates :role, presence: true
    validates :residence, presence: true
    validates :start_date, presence: true

end


