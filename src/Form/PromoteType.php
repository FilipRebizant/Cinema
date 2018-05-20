<?php

namespace App\Form;

use App\Entity\Movie;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class PromoteType extends AbstractType {

    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
                
                ->add('roles', ChoiceType::class, array(
                    'multiple' => true,
                    'choices' => $this->getChoices(),
                    'attr' => array('class' => 'form-control')))

       ;
    }

    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults([
            'data_class' => \App\Entity\FOSUser::class,
        ]);
    }

    public function getChoices() {
        return [
            'Global Admin' => 'ROLE_SUPER_ADMIN',
            'User' => 'ROLE_USER'
            ];
    }

}
